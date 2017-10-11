let queries = {};

queries.ensureTables =
`CREATE TABLE IF NOT EXISTS project (
  project_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  github_name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  url VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS technology (
  technology_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS project_technology (
  technology_id INTEGER REFERENCES technology (technology_id) ON UPDATE CASCADE,
  project_id INTEGER REFERENCES project (project_id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT project_technology_pk PRIMARY KEY (technology_id, project_id)
);`;

queries.insertProject = 
`INSERT INTO project(title, image, github_name, description, url) 
VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING;`;

queries.insertTechnology =
`INSERT INTO technology(name) 
VALUES($1) ON CONFLICT DO NOTHING;`;

queries.insertProjectTechnology =
`INSERT INTO project_technology(technology_id, project_id) 
VALUES($1, $2) ON CONFLICT DO NOTHING;`;

module.exports = queries;