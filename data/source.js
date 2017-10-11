'use strict';

const fs = require('fs');
const diagnostics = require('../diagnostics');
const request = require('superagent');

function loadLocalData() {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/projects.json`, function (error, projectsData) {
      diagnostics.reportIf(error);
      resolve(JSON.parse(projectsData));
    });
  });
}

function loadRemoteData(localData) {
  let promises = [];
  for (let project of localData) {
    promises.push(new Promise((resolve, reject) => {
      request
        .get(`https://api.github.com/repos/nharren/${project.github_name}`)
        .set('Authorization', `token ${process.env.GITHUB_TOKEN}`)
        .set('User-Agent', 'nharren')
        .end((error, response) => {
          diagnostics.reportIf(error);
          resolve(response.body);
        });
    }));
  }
  return Promise.all(promises);
}

async function mergeData() {
  let localData = await loadLocalData();
  let remoteData = await loadRemoteData(localData);

  for (let remoteProject of remoteData) {
    for (let localProject of localData) {
      if (localProject.github_name === remoteProject.name) {
        localProject.description = remoteProject.description;
        localProject.url = remoteProject.html_url;
      }
    }
  }

  return localData;
}

module.exports = mergeData;