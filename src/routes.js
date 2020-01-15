const { Router } = require('express');

const DevController = require('./controllers/dev/DevController');
const SearchController = require('./controllers/dev/SearchController');

const routes = Router();

routes.get('/users', DevController.getAll);
routes.post('/getAll', SearchController.getAllInRange);
routes.post('/search', SearchController.searchInRange);
routes.post('/users/create', DevController.create);

module.exports = routes;