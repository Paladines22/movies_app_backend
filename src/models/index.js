const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Actor.belongsTo(Movie)
Movie.hasMany(Actor)

Director.belongsTo(Movie)
Movie.hasMany(Director)



Movie.belongsToMany(Genre, {through: "movieGenres"})
Genre.belongsToMany( Movie, {through: "movieGenres" })