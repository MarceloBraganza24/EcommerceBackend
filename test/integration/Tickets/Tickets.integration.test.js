import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('Pruebas de integración del modulo de tickets', () => {
    let cookie;
    it('GET de /api/tickets debe obtener correctamente el listado de tickets', async() => {
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
        const { statusCode, _body } = await requester.get('/api/tickets').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(statusCode).to.be.eql(200);
        expect(_body).to.have.property('data');
        expect(Array.isArray(_body.data)).to.be.eql(true);
    });
    it('GET de /api/tickets/:tid debe obtener a un ticket por id', async () => {
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
        const mockTicket = {
            amount: 200,
            purchaser: 'pp@gmail.com'
        }
        const { _body } = await requester.post('/api/tickets').send(mockTicket).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        const data = await requester.get(`/api/tickets/${_body.data._id}`).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(data.statusCode).to.be.eql(200);
        expect(typeof data._body.data).to.be.eql('object');
    });
    it('POST de /api/tickets se debe obtener el id autogenerado por la BDD luego de hacer la inserción', async() => {
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
        const mockTicket = {
            amount: 200,
            purchaser: 'pp@gmail.com'
        }
        const { statusCode, _body } = await requester.post('/api/tickets').send(mockTicket).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(statusCode).to.be.eql(201);
        expect(_body.data).to.have.property('purchaser');
    });
})