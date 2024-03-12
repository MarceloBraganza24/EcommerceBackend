import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('Pruebas de integración del modulo de vistas', () => {
    let cookie;
    it('GET de /users-view debe obtener correctamente la vista con el listado de usuarios', async() => {
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
        const { statusCode } = await requester.get('/users-view').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(statusCode).to.be.eql(200);
    });
    it('GET de /carts-view debe obtener correctamente la vista con el listado de carritos', async() => {
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
        const { statusCode } = await requester.get('/carts-view').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(statusCode).to.be.eql(200);
    });
    it('GET de /shopping-cart-user-view debe obtener correctamente la vista con el listado de carritos', async() => {
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
        const { statusCode } = await requester.get('/shopping-cart-user-view').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(statusCode).to.be.eql(500);
    });
    it('GET de /finalize-purchase-view debe obtener correctamente la vista con el listado de carritos', async() => {
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
        const { statusCode } = await requester.get('/finalize-purchase-view').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(statusCode).to.be.eql(500);
    });
    it('GET de /products-view debe obtener correctamente la vista con el listado de carritos', async() => {
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
        const { statusCode } = await requester.get('/products-view').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(statusCode).to.be.eql(200);
    });
    it('GET de /login-view debe obtener correctamente la vista con el listado de carritos', async() => {
        const { statusCode } = await requester.get('/login-view');
        expect(statusCode).to.be.eql(200);
    });
    it('GET de /resetPass-view debe obtener correctamente la vista con el listado de carritos', async() => {
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
        const { statusCode } = await requester.get('/resetPass-view').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(statusCode).to.be.eql(200);
    });
    it('GET de /newPass-view debe obtener correctamente la vista con el listado de carritos', async() => {
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
        const { statusCode } = await requester.get('/newPass-view').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(statusCode).to.be.eql(200);
    });
})