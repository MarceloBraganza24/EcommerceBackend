import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('Pruebas de integración del modulo de productos', () => {
    let cookie;
    it('GET de /api/products debe obtener correctamente el listado de productos', async() => {
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
        const { statusCode, _body } = await requester.get('/api/products').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(statusCode).to.be.eql(200);
        expect(_body.data).to.have.property('docs');
        expect(Array.isArray(_body.data.docs)).to.be.eql(true);
    });
    it('GET de /api/products/:pid debe obtener a un producto por id', async () => {
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
        const mockProduct = {
            title: 'Interfaz de audio',
            description: 'Tecnologia musical',
            stock: 10,
            price: 1500,
            category: 'Audio',
            code: '65169sd198s19d81s'
        }
        const { _body } = await requester.post('/api/products').send(mockProduct).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        const data = await requester.get(`/api/products/${_body.data._id}`).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(data.statusCode).to.be.eql(200);
        expect(typeof data._body.data).to.be.eql('object');
    });
    it('POST de /api/products se debe obtener el id autogenerado por la BDD luego de hacer la inserción', async() => {
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
        const mockProduct = {
            title: 'Interfaz de audio',
            description: 'Tecnologia musical',
            stock: 10,
            price: 1500,
            category: 'Audio',
            code: '65169sd198s19d81s'
        }
        const { statusCode, _body } = await requester.post('/api/products').send(mockProduct).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(statusCode).to.be.eql(201);
        expect(_body.data).to.have.property('_id');
    });
    it('PUT de /api/products/:pid debe poder actualizar correctamente un producto a partir de su ID', async() => {
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
        const mockProduct = {
            title: 'Interfaz de audio',
            description: 'Tecnologia musical',
            stock: 10,
            price: 1500,
            category: 'Audio',
            code: '3600'
        }
        const { _body } = await requester.post('/api/products').send(mockProduct).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        const id = _body.data._id;
        const mockProductUpdate = {
            title: 'Interfaz de audio update',
            description: 'Tecnologia musical update',
            stock: 10,
            price: 1500,
            category: 'Audio',
            code: '3600',
            owner: 'pp@gmail.com',
            thumbnail: 'Ruta Interfaz de audio'
        }
        const updateResult = await requester.put(`/api/products/${id}`).send(id, mockProductUpdate).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(updateResult.statusCode).to.be.eql(400);
    });
    it('DELETE de /api/products/:pid debe poder borrar un producto a partir de su ID', async() => {
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
        const mockProduct = {
            title: 'Interfaz de audio',
            description: 'Tecnologia musical',
            stock: 10,
            price: 1500,
            category: 'Audio',
            code: '65169sd198s19d81s'
        }
        const { _body } = await requester.post('/api/products').send(mockProduct).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        const id = _body.data._id;
        const deleteResult = await requester.delete(`/api/products/${id}`).set('Cookie', [`${cookie.name}=${cookie.value}`]);
        expect(deleteResult.statusCode).to.be.eql(200);
        const getResult = await requester.get('/api/products').set('Cookie', [`${cookie.name}=${cookie.value}`]);
        const product = getResult._body.data;
        expect(product._id).to.be.eql(undefined);
    });
})