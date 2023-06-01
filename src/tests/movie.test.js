const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models");

let movieId;

test("POST/movies", async () => {
  const movie = {
    name: "El Arbol de la Vida",
    image: "http://mi-image",
    synopsis: "adjbajdakdnakdna",
    releaseYear: "1999",
  };
  const res = await request(app).post("/movies").send(movie);
  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET/movies", async () => {
  const res = await request(app).get("/movies");

  expect(res.body).toHaveLength(1);
  expect(res.body[0].genres).toBeDefined();
  expect(res.status).toBe(200);
});

test("PUT/movies/:id", async () => {
  const movieUpdated = {
    name: "El arbol de la vida updated",
  };
  const res = await request(app).put(`/movies/${movieId}`).send(movieUpdated);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movieUpdated.name);
});

test("POST/movies/:id/genres should set the movies genres", async () => {
  const genre = await Genre.create({ name: "Ciencia Ficcion" });
  const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([genre.id]);

  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST/movies/:id/actors", async () => {
  const actor = await Actor.create({
    firstName: "Leonardo",
    lastName: "Dicaprio",
    nationality: "USA",
    image: "https://flxt.tmsimg.com/assets/435_v9_bc.jpg",
    birthday: "1972-04-14",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id]);

  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST/movies/:id/directors", async () => {
  const director = await Director.create({
    firstName: "Stiven",
    lastName: "Spilberg",
    nationality: "USA",
    image: "https://flxt.tmsimg.com/assets/435_v9_bc.jpg",
    birthday: "1972-11-14",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([director.id]);

  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("DELETE/movies/:id", async () => {
  const res = await request(app).delete(`/movies/${movieId}`);

  expect(res.status).toBe(204);
});
