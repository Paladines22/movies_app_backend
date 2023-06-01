const request = require("supertest");
const app = require("../app");
require("../models");

let directorId;

test("POST/directors", async () => {
  const director = {
    firstName: "Guillermo",
    lastName: "del Toro",
    nationality: "Mexico",
    image: "https://mi-image",
    birthday: "1983-09-14",
  };
  const res = await request(app).post("/directors").send(director);
  directorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET/directors", async () => {
  const res = await request(app).get("/directors");

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT/directors/:id", async () => {
  const directorUpdated = {
    firstName: "Guillermo updated",
  };
  const res = await request(app)
    .put(`/directors/${directorId}`)
    .send(directorUpdated);

  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(directorUpdated.firstName);
});

test("DELETE/directors/:id", async () => {
  const res = await request(app).delete(`/directors/${directorId}`);
  expect(res.status).toBe(204);
});
