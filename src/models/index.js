const Movie = require("./Movies");
const Actor = require("./Actors");
const Director = require("./Directors");
const Genre = require( "./Genres");


Movie.belongsTo(Actor);
Actor.hasMany(Movie);

Director.belongsToMany(Movie, { through: "movie_directors"});
Movie.belongsToMany(Director, { through: "movie_directors"});

Movie.belongsToMany(Genre, { through: "movie_genres"});
Genre.belongsToMany(Movie, { through: "movie_genres"});