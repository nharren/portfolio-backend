const Router = require('express-promise-router');
const projectRouter = new Router();
const db = require('../db');

const projectQuery = 
`SELECT * FROM project p
 INNER JOIN project_technology pt
 ON p.project_id = pt.project_id;`;

projectRouter.get('/project', async (request, response) => {
  const { rows } = await db.query(projectQuery);

  var groupBy = rows.reduce(function(acc, cur) {
    let project = acc.find(v => v.project_id === cur.project_id);

    if (!project) {
      project = cur;
      project.technologies = [];
      acc.push(project);
    }

    project.technologies.push(cur.technology_id);

    delete cur.technology_id;

    return acc;
  }, []);

  response.send(groupBy);
});

module.exports = projectRouter;