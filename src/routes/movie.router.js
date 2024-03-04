const { getAll, create, getOne, remove, update, setGenre, setActor, setDirector } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/movies')
    .get(getAll)
    .post(create);

movieRouter.route('/movies/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/movies/:id/genre')
    .post(setGenre)

movieRouter.route('/movies/:id/actor')
    .post(setActor)

movieRouter.route('/movies/:id/director')
    .post(setDirector)


module.exports = movieRouter;