const request = require('supertest');
const app = require('../app');

let id = 0;

test('Get de directors debe retornar un status 200', async () => {
  const res = await request(app).get('/directors');
  expect(res.status).toBe(200)
})

test('POST /directors debe crear un director', async () => {
    const body = {
        firstName: "Cesar",
        lastName: "montes",
        nationality: "colombian",
        image: "www.cesar.com",
        birthday: "2024-06-25"
    };  
    const res = await request(app).post('/directors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name)
});

test('Get One /directors/:id debe retornarme un estatus 200', async () => {
  const res = await request(app).get(`/directors/${id}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBeDefined();
})

test('PUT /directors/:id debe actualizar un dato del director ', async () => {
  const body = {
    firstName: "david",
};  
  const res = await request(app).put(`/directors/${id}`).send(body);
  expect(res.status).toBe(200);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(body.name);

})


test('DELETE directors/:id debe eliminar un director por su id', async () => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.status).toBe(204);
});