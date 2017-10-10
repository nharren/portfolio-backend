const githubRouter = require('./github-router');
const projectRouter = require('./project-router');
const technologyRouter = require('./technology-router');

module.exports = (app) => {
  app.use(githubRouter);
  app.use(projectRouter);
  app.use(technologyRouter);
}