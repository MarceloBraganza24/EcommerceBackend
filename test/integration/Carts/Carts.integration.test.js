import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('Pruebas de integración del modulo de carritos de compra', () => {
    let cookie;
    it('GET de /api/carts debe obtener correctamente el listado de carritos de compra', async() => {
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
        const { statusCode, _body } = await requester.get('/api/carts').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(statusCode).to.be.eql(200);
        expect(_body).to.have.property('data');
        expect(Array.isArray(_body.data)).to.be.eql(true);
    });
    it('GET de /api/carts/:cid debe obtener a un carrito por id', async () => {
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
        const mockCart = {
            products: []
        }
        const { _body } = await requester.post('/api/carts').send(mockCart).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        const data = await requester.get(`/api/carts/${_body.data._id}`).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(data.statusCode).to.be.eql(200);
        expect(typeof data._body.data).to.be.eql('object');
    });
    it('POST de /api/carts se debe obtener el id autogenerado por la BDD luego de hacer la inserción', async() => {
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
        const mockCart = {
            products: []
        }
        const { statusCode, _body } = await requester.post('/api/carts').send(mockCart).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(statusCode).to.be.eql(201);
        expect(_body.data).to.have.property('_id');
    });
    it('PUT de /api/carts/:cid debe poder actualizar correctamente un carrito a partir de su ID', async() => {
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
        const mockCart = {
            products: []
        }
        const { _body } = await requester.post('/api/carts').send(mockCart).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        const id = _body.data._id;
        const mockCartUpdate = {
            products: [
                {
                    product: {
                        _id: "s6315d1818bv81s19"
                    },
                    quantity: 66666
                }
            ]
        }
        const updateResult = await requester.put(`/api/carts/${id}`).send(id, mockCartUpdate).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(updateResult.statusCode).to.be.eql(400);
    });
    it('DELETE de /api/carts/:cid debe poder borrar un carrito a partir de su ID', async() => {
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
        const mockCart = {
            products: []
        }
        const { _body } = await requester.post('/api/carts').send(mockCart).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        const id = _body.data._id;
        const deleteResult = await requester.delete(`/api/carts/${id}`).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(deleteResult.statusCode).to.be.eql(200);
        const getResult = await requester.get('/api/carts').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        const carts = getResult._body.data;
        expect(carts.find(cart => cart._id === id)).to.be.eql(undefined);
    });
})