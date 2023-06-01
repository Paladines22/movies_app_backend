const request = require("supertest");
const app = require("../app");
require("../models");

let actorId;

test("POST/actors", async () => {
  const actor = {
    firstName: "Leonardo",
    lastName: "Dicaprio",
    nationality: "USA",
    image: "https://flxt.tmsimg.com/assets/435_v9_bc.jpg",
    birthday: "1972-04-14",
  };
  const res = await request(app).post("/actors").send(actor);
  actorId = res.body.id;

  
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET/actors", async () => {
  const res = await request(app).get("/actors");

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT/actors/:id", async () => {
  const actorUpdated = {
    firstName: "Leonardo Updated",
  };
  const res = await request(app).put(`/actors/${actorId}`).send(actorUpdated);

  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(actorUpdated.firstName);
});

test("DELETE/actors/:id ", async () => {
  const res = await request(app).delete(`/actors/${actorId}`);
  expect(res.status).toBe(204);
});
