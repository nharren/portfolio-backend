'use strict';

require('dotenv').config();

const loadProjects = require('../data/source.js');
const db = require('../db');
const queries = require('./queries');

seed();

async function seed() {
  db.ensureTables();

  const projectsData = await loadProjects();

  Promise.all([
    insertProjects(projectsData),
    insertTechnologies(projectsData)
  ])
  .then(() => {
    insertProjectTechnologies(projectsData);
  });
}

function insertProjects(projectsData) {
  let promises = new Array(projectsData.length);

  for (let project of projectsData) {
    let parameters = [
      project.title,
      project.image,
      project.github_name,
      project.description,
      project.url
    ];

    let promise = db.query(queries.insertProject, parameters);
    promises.push(promise);
  }

  return Promise.all(promises);
}

function insertTechnologies(projectsData) {
  let uniqueTechnologies = {};
  
  for (let project of projectsData) {
    for (let technology of project.technologies) {
      if (!uniqueTechnologies[technology]) {
        uniqueTechnologies[technology] = db.query(queries.insertTechnology, [technology]);
      }
    }
  }
  
  return Promise.all(Object.values(uniqueTechnologies));
}

function insertProjectTechnologies(projectsData) {
  return queryProjects(projectsData)
    .then(results => {
      let projects = results[0].rows;
      let technologies = results[1].rows;

      for (let project of projectsData) {
        let projectId = projects.find(record => record.github_name === project.github_name).project_id;
        for (let technology of project.technologies) {
          let technologyId = technologies.find(record => record.name === technology).technology_id;
    
          db.query(queries.insertProjectTechnology, [technologyId, projectId]);
        }
      }
    });
}

function queryProjects(projectsData) {
  return Promise.all([
    db.query(`SELECT project_id, github_name FROM project;`),
    db.query(`SELECT technology_id, name FROM technology;`)
  ]);   
}