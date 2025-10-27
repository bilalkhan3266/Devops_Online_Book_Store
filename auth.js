const request = require('supertest');
const app = require('../src/index');

describe('Auth', ()=>{
  test('signup & login', async ()=>{
    const u = {name:'T',email:'t@t.com',password:'pwd'};
    const signup = await request(app).post('/api/v1/auth/signup').send(u);
    expect(signup.status).toBe(201);
    const login = await request(app).post('/api/v1/auth/login').send({email:u.email,password:u.password});
    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
  }, 10000);
});
