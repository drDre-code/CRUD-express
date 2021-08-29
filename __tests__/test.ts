const supertest = require('supertest');
const app = require('../src/app');
let data: { [key: string]: string | number | string[] }[];
try {
  data = require('../database/data.json');
} catch (err) {
  data = []
}
const idArr = data.map(x => x.id);

describe("Get all Data", () => {
  it("should get all data if there's a database", async () => {
    if (data.length > 0) {
      await supertest(app)
        .get("/api")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    }
  });
  it("should get all data if there's a database", async () => {
    if (data.length===0) {
      await supertest(app)
        .get("/api")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404);
    }
  });
});

describe("Get Single Data", () => {
  it("should return 200 if id is found ", async () => {
    const id = 3;
    if (idArr.includes(id)) {
      await supertest(app)
        .get(`/api/${id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    }
  });
  it("should return 404 if id is not found ", async () => {
    const id = 3;
    if (!idArr.includes(id)) {
      await supertest(app)
        .get(`/api/${id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404);
    }
  })
});

describe("Post Data", () => {
  it("should post Data ", async () => {
    const obj = {
      id: 1,
      organization: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      products: [],
      marketValue: '',
      address: '',
      ceo: '',
      country: '',
      noOfEmployees: 1,
      employees: []
    }
    await supertest(app)
      .post('/api')
      .send(obj)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
  });
});

describe("Update Data", () => {
  const obj = {
    id: 1,
    organization: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    products: [],
    marketValue: '',
    address: '',
    ceo: '',
    country: '',
    noOfEmployees: 1,
    employees: []
  }
  const id = 3;
  it("should return 404 id does exists", async () => {
    if (!idArr.includes(id)) {
      await supertest(app)
        .put(`/api/${id}`)
        .send(obj)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404);
    }
  });
  it("should return 200 if id exist", async () => {
    if (idArr.includes(id)) {
      await supertest(app)
        .put(`/api/${id}`)
        .send(obj)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);
    }
  });
});

describe("Delete Data", () => {

  const id = 6;
  it("should return 404 if id doesn't exists", async () => {
    if (!idArr.includes(id)) {
      await supertest(app)
        .delete(`/api/${id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404);
    }
  });
  it("should return 200 id exist", async () => {
    if (idArr.includes(id)) {
      await supertest(app)
        .delete(`/api/${id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    }
  });
});



