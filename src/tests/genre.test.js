const request = require('supertest');
const app = require('../app');

let id = 0;

test('Get de genres debe retornar un status 200', async () => {
  const res = await request(app).get('/genres');
  expect(res.status).toBe(200)
})

test('POST /genres debe crear un genero', async () => {
    const body = {
        name: "Scary Movie",
        image: "www.scarymovie.com",
        synopsis: "terror",
        releaseYear: 2000
    };  
    const res = await request(app).post('/genres').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name)
});

test('Get One /genres/:id debe retornarme un estatus 200', async () => {
  const res = await request(app).get(`/genres/${id}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBeDefined();
})

test('PUT /movies/:id debe actualizar un genero para una movie', async () => {
  const body = {
    name: "fiction",
};  
  const res = await request(app).put(`/genres/${id}`).send(body);
  expect(res.status).toBe(200);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(body.name);

})


test('DELETE genres/:id debe eliminar un genero por su id', async () => {
  const res = await request(app).delete(`/genres/${id}`);
  expect(res.status).toBe(204);
});