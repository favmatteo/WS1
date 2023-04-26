const { app, sequelize, request } = require('./config');

describe('Users API', () => {
  describe('POST /user/create', () => {
    it('Create a new user', () => {
      return request(app)
        .post('/user/create')
        .auth(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD)
        .send({
          id_user: Math.random().toString(36).slice(2),
          name: 'default',
          surname: 'default',
          email: 'deafult@default.it',
          photo: 'default.png',
          id_role: 1,
        })
        .expect('Content-Type', /json/)
        .expect(201, {
          status: 201,
          message: 'User created!',
        });
    });
  });

  describe('GET /user/all', () => {
    it('Return all users', () => {
      return request(app)
        .get('/user/all')
        .auth(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD)
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('GET /user/1', () => {
    it('Return the user n°1', () => {
      return request(app)
        .get('/user/1')
        .auth(process.env.TEST_USER_EMAIL, process.env.TEST_USER_PASSWORD)
        .expect('Content-Type', /json/)
        .expect(200, {
          status: 200,
          message: 'User with id 1',
          result: [
            {
              id_user: '1',
              name: 'Giovanna',
              surname: 'Darco',
              email: 'giovanna@gmail.com',
              photo: 'Link.png',
              id_role: 2,
            },
          ],
        });
    });
  });
});
