import { expect } from 'chai';
import sinon from 'sinon';
import * as usersService from '../../../src/services/users.service.js'

describe('Users service', () => {
    it('Debería retornar todos los usuarios', async () => {
        const stubUsers = [
            {
                first_name: 'Marce mock',
                last_name: 'Braga mock',
                email: 'mbm@gmail.com',
                pasword: 'dsdsda562sddscom',
                role: 'admin'
            }
        ];
        const stub = sinon.stub(usersService.usersRepository, 'getAll').returns(stubUsers);
        await usersService.getAll();
        expect(stub.calledOnce).to.be.true;
        stub.restore();
    });
    it('Debería retornar un usuario por id', async () => {
        const uid = '123456789';
        const stubUser = {
            first_name: 'Marce mock',
            last_name: 'Braga mock',
            email: 'mbm@gmail.com',
            pasword: 'dsdsda562sddscom',
            role: 'admin'
        }
        const stub = sinon.stub(usersService.usersRepository, 'getById').returns(stubUser);
        await usersService.getById(uid);
        expect(stub.calledOnce).to.be.true;
        stub.restore();
    });
    it('Debería retornar un usuario por email', async () => {
        const email = 'test@test.com';
        const stubUser = {
            first_name: 'Marce mock',
            last_name: 'Braga mock',
            email: 'mbm@gmail.com',
            pasword: 'dsdsda562sddscom',
            role: 'admin'
        }
        const stub = sinon.stub(usersService.usersRepository, 'getByEmail').returns(stubUser);
        await usersService.getByEmail(email);
        expect(stub.calledOnce).to.be.true;
        stub.restore();
    });
    it('Debería retornar el usuario actual', async () => {
        const stubUser = {
            first_name: 'Marce mock',
            email: 'mbm@gmail.com',
            role: 'admin'
        }
        const stub = sinon.stub(usersService.usersRepository, 'getCurrent').returns(stubUser);
        await usersService.getCurrent(stubUser);
        expect(stub.calledOnce).to.be.true;
        stub.restore();
    });
    it('Debería retornar una excepción por usuario no encontrado', async () => {
        const stub = sinon.stub(usersService.usersRepository, 'getByEmail').returns(null);
        await usersService.getByEmail('test@test.com').catch((error) => {
            expect(error.message).to.eql('user not found'); 
        });
        stub.restore();
    });
    it('Debería retornar el usuario actualizado', async () => {
        const uid = '123456789';
        const stubUserToUpdate = {
            first_name: 'Marce mock',
            last_name: 'Braga mock',
            email: 'mbm@gmail.com',
            pasword: 'dsdsda562sddscom',
            role: 'admin'
        }
        const stub = sinon.stub(usersService.usersRepository, 'update').returns(stubUserToUpdate);
        await usersService.update(uid, stubUserToUpdate);
        expect(stub.calledOnce).to.be.true;
        stub.restore();
    });
})