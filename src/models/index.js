const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

//relacion uno a muchos 
Actor.belongsTo(Movie)
Movie.hasMany(Actor)

// uno a muchos 
Director.belongsTo(Movie)
Movie.hasMany(Director)

// muchos a muchos 
Movie.belongsToMany(Genre, {through: "MoviesGenres"})
Genre.belongsToMany( Movie, {through: "MoviesGenres" })

