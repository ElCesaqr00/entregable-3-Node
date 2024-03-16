const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actors');
const Director = require('../models/Directors');
const Genre = require('../models/Genres');
let id = 0;

test('GET /movies debe retornar status 200', async () => {
  const res = await request(app).get('/movies');
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una movie', async () => {
    const body = {
        name: "Scary Movie",
        image: "www.scarymovie.com",
        synopsis: "terror",
        releaseYear: 2000
    };  
    const res = await request(app).post('/movies').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name)
});

test('Get One /movies/:id debe retornarme un estatus 200', async () => {
  const res = await request(app).get(`/movies/${id}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBeDefined();
})

test('PUT /movies/:id debe actualizar una movie', async () => {
  const body = {
    name: "cali",
};  
  const res = await request(app).put(`/movies/${id}`).send(body);
  expect(res.status).toBe(200);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(body.name);

})


test('DELETE movies/:id debe eliminar una movie por su id', async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.status).toBe(204);
});



test('POST /movies/:id/actors debe agregar un actor a una película', async () => {
  // Crear una nueva película
  const otherMovie = {
    name: 'Piratas del caribe',
    image: 'www.PiratasDelCaribe.com',
    synopsis: 'dhskjlsjafds',
    releaseYear: 2000
  };
  const movieResponse = await request(app).post('/movies').send(otherMovie);
  const movieId = movieResponse.body.id;


  const newActor = {
    firstName: 'Jhonny',
    lastName: 'Deep',
    nationality: 'USA',
    image: 'www.PiratasDelCaribe.com',
    birthday: '1966-09-09'
  };
  const actorResponse = await request(app).post('/actors').send(newActor);
  const actorId = actorResponse.body.id;


  const response = await request(app).post(`/movies/${movieId}/actors`).send([actorId]);
  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: actorId }),
    ]),
  );

  await request(app).delete(`/actors/${actorId}`);
});

test('POST /movies/:id/directors debe agregar un director existente a una película', async () => {

  const otherMovie = {
    name: 'Matrix',
    image: 'htttp://www.image.com',
    synopsis: 'dhskjlsjafds',
    releaseYear: 2000
  };
  const movieResponse = await request(app).post('/movies').send(otherMovie);
  const movieId = movieResponse.body.id;

  const newDirector = {
    firstName: 'Lana',
    lastName: 'Wachowski',
    nationality: 'USA',
    image: 'htttp://www.image.com',
    birthday: '1965-06-21'
  };
  const directorResponse = await request(app).post('/directors').send(newDirector);
  const directorId = directorResponse.body.id;

  const response = await request(app).post(`/movies/${movieId}/directors`).send([directorId]);
  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: directorId }),
    ]),
  );

  await request(app).delete(`/directors/${directorId}`);
});

test('POST /movies/:id/genres debe agregar un género existente a una película', async () => {

  const otherMovie = {
    name: 'Matrix',
    image: 'htttp://www.image.com',
    synopsis: 'dhskjlsjafds',
    releaseYear: 2000
  };
  const movieResponse = await request(app).post('/movies').send(otherMovie);
  const movieId = movieResponse.body.id;

  const newGenre = {
    name: 'Fantasy'
  };
  const genreResponse = await request(app).post('/genres').send(newGenre);
  const genreId = genreResponse.body.id;

  const response = await request(app).post(`/movies/${movieId}/genres`).send([genreId]);
  expect(response.status).toBe(200);
  expect(response.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ id: genreId }),
    ]),
  );
  
  await request(app).delete(`/genres/${genreId}`);
});


