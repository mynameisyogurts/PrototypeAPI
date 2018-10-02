const ideas = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getIdeas = (request, response) => {
  const responseJSON = {
    ideas,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const headUsers = (request, response) => respondJSONMeta(request, response, 200);

// Function that handles adding users, and responds if nothing is added
const addIdea = (request, response, body) => {
  const responseJSON = {
    message: 'Idea and category are both required.',
  };

  if (!body.idea || !body.category) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (ideas[body.idea]) {
    responseCode = 204;
  } else {
    ideas[body.idea] = {};
  }

  ideas[body.idea].idea = body.idea;
  ideas[body.idea].category = body.category;
  ideas[body.idea].description = body.description;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getIdeas,
  headUsers,
  addIdea,
  notFound,
};
