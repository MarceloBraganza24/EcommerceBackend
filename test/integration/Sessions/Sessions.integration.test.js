import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('Testing del modulo de sessions', () => {
    let cookie;
    it('Debemos loguear al usuario y retornar un cookie', async() => {
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
        expect(cookie.name).to.be.ok.and.eql('TokenJWT');
        expect(cookie.value).to.be.ok;
    });
    it('Debemos enviar una cookie en el servicio current y entregar la información del usuario', async() => {
        const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(_body.payload.email).to.be.eql('marceebraga@gmail.com')
    });
})