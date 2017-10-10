const Router = require('express-promise-router');
const technologyRouter = Router();
const db = require('../db');

const technologiesQuery = 'SELECT * FROM technology;';
const technologyQuery = 
`SELECT * FROM technology
 WHERE technology_id = $1;`

technologyRouter.get('/technology', async (request, response) => {
  const { rows } = await db.query(technologiesQuery);
  response.send(rows);
})

technologyRouter.get('/technology/:id', async (request, response) => {
  const { id } = req.params
  const { rows } = db.query(technologyQuery, [id])
  response.send(rows);
});

module.exports = technologyRouter;