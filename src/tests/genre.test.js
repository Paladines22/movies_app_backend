const request = require("supertest");
const app = require("../app");
require("../models");

let genreId;

test("POST/genres ", async () => {
  const genre = {
    name: "Thriller",
  };
  const res = await request(app).post("/genres").send(genre);
  genreId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET/genres ", async () => {
  const res = await request(app).get("/genres");
  console.log(res.body);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].movies).toBeDefined();
  expect(res.status).toBe(200);
});

test("PUT/ genres/:id debe actualizar el genre", async () => {
  const genreUpdated = {
    name: "Triller updated",
  };
  const res = await request(app).put(`/genres/${genreId}`).send(genreUpdated);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(genreUpdated.name);
});

test("DELETE/genres/:id debe eliminar un genre", async () => {
  const res = await request(app).delete(`/genres/${genreId}`);
  expect(res.status).toBe(204);
});
