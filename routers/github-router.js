const Router = require('express').Router;
const githubRouter = Router();
const requestProxy = require('express-request-proxy');

function proxyGitHub(request, response) {
  (requestProxy({
    url: `https://api.github.com/${request.params[0]}`,
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'User-Agent': 'nharren'
    }
  }))(request, response);
}

githubRouter.get('/github/*', proxyGitHub);

module.exports = githubRouter;