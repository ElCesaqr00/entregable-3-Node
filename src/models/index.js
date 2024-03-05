const Movie = require("./Movies");
const Actor = require("./Actors");
const Director = require("./Directors");
const Genre = require( "./Genres");


Movie.belongsToMany(Actor, { through: "movie_actors"});
Actor.belongsToMany(Movie, { through: "movie_actors"});

Director.belongsToMany(Movie, { through: "movie_directors"});
Movie.belongsToMany(Director, { through: "movie_directors"});

Movie.belongsToMany(Genre, { through: "movie_genres"});
Genre.belongsToMany(Movie, { through: "movie_genres"});