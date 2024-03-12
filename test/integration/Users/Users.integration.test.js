import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('Pruebas de integración del modulo de usuarios', () => {
    let cookie;
    it('GET de /api/users debe obtener correctamente el listado usuarios', async() => {
        const credentialsMock = {
            email: 'marceebraga@gmail.com',
            password: '1234'
        }
        const loginResult = await requester.post('/api/sessions/login').send(credentialsMock);
        const cookieResult = loginResult.headers['set-cookie'][0];
        expect(cookieResult).to.be.ok;
        const cookieResultSplit = cookieResult.split('=');
        cookie = {
            name: cookieResultSplit[0],
            value: cookieResultSplit[1]
        }
        const { statusCode, _body } = await requester.get('/api/users').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(statusCode).to.be.eql(200);
        expect(_body).to.have.property('data');
        expect(Array.isArray(_body.data)).to.be.eql(true);
    });
})