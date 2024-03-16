const request = require('supertest');
const app = require('../app');

let id = 0;

test('Get de actors debe retornar un status 200', async () => {
  const res = await request(app).get('/actors');
  expect(res.status).toBe(200)
})

test('POST /actors debe crear un actor', async () => {
    const body = {
        firstName: "Cesar",
        lastName: "montes",
        nationality: "colombian",
        image: "www.cesar.com",
        birthday: "2024-06-25"
    };  
    const res = await request(app).post('/actors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name)
});

test('Get One /actors/:id debe retornarme un estatus 200', async () => {
  const res = await request(app).get(`/actors/${id}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBeDefined();
})

test('PUT /actors/:id debe actualizar datos de un actor ', async () => {
  const body = {
    firstName: "david",
};  
  const res = await request(app).put(`/actors/${id}`).send(body);
  expect(res.status).toBe(200);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(body.name);

})


test('DELETE actors/:id debe eliminar un actor por su id', async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});