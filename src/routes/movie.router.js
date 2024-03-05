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

movieRouter.route('/movies/:id/genres')
    .post(setGenre)

movieRouter.route('/movies/:id/actors')
    .post(setActor)

movieRouter.route('/movies/:id/directors')
    .post(setDirector)


module.exports = movieRouter;