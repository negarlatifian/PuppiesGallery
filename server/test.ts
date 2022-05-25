import request from "supertest";
import app from "./app";

describe("Testing api endpoint", () => {
  test("check if taking data about all puppies", async () => {
    const res = await request(app).get("/api/puppies");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      {
        id: 1,
        breed: "Bulldog",
        name: "Jack",
        birth: "2000.05.10",
      },
      {
        id: 2,
        breed: "Bokser",
        name: "Rocky",
        birth: "2002.05.08",
      },
      {
        id: 3,
        breed: "Spaniel",
        name: "Carmen",
        birth: "2009.02.11",
      },
      {
        id: 4,
        breed: "Pug",
        name: "Reksio",
        birth: "2015.02.11",
      },
      {
        id: 5,
        breed: "Bulldog",
        name: "Jane",
        birth: "2021.09.10",
      },
    ]);
  });

  test("check one puppy", async () => {
    const res = await request(app).get("/api/puppies/2");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: 2,
      breed: "Bokser",
      name: "Rocky",
      birth: "2002.05.08",
    });
  });

  test("check if one puppy is added", async () => {
    const puppy = {
      breed: "Bokser",
      name: "Rocky",
      birth: "2002.05.08",
    };

    const res = await request(app).post("/api/puppies").send(puppy);
    expect(res.status).toEqual(201);
    expect(res.body).toStrictEqual("done");
  });
  test("check if invalid puppy isn't added", async () => {
    const puppy = {
      name: "Rocky",
      birth: "2002.05.08",
    };

    const res = await request(app).post("/api/puppies").send(puppy);
    expect(res.status).toEqual(404);
    expect(res.body).toStrictEqual("Not found!");
  });

  test("check if one puppy is updated", async () => {
    const puppy = {
      breed: "Bokser",
      name: "Rocky",
      birth: "2002.05.08",
    };

    const res = await request(app).put("/api/puppies/3").send(puppy);
    expect(res.status).toEqual(204);
    const res2 = await request(app).get("/api/puppies/3");
    expect(res2.body).toEqual({
      id: 3,
      breed: "Bokser",
      name: "Rocky",
      birth: "2002.05.08",
    });
  });

  test("check if invalid information are not added to a puppy", async () => {
    const puppy = {
      name: "Rocky",
      birth: "2002.05.08",
    };

    const res = await request(app).put("/api/puppies/3").send(puppy);
    expect(res.status).toEqual(404);
    expect(res.body).toStrictEqual("Not found!");
  });

  test("check if one puppy is deleted", async () => {
    const res = await request(app).delete("/api/puppies/4");
    expect(res.status).toEqual(204);
    expect(res.body).toStrictEqual({});
  });
});
