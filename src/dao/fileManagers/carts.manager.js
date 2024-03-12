import fs from 'fs';

export default class cartManager {

    constructor(path) {
        this.path = path;
    }

    getCarts = async () => {

        try {

            if (fs.existsSync(this.path)) {

                const data = await fs.promises.readFile(this.path, 'utf-8');
                const carts = JSON.parse(data);
                return carts;                

            } else {
                return [];
            }

        } catch (error) {
            console.log(error);
        }

    }

    addCart = async(cart) => {

        try {
            
            const carts = await this.getCarts();

            if (carts.length === 0) {
                cart.id = 1;
            } else {
                cart.id = carts[carts.length - 1].id + 1;
            }

            carts.push(cart);

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            
        } catch (error) {
            console.log(error);
        }

    } 

};