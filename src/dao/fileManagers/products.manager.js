import fs from 'fs';

export default class productManager {

    constructor(path) {
        this.path = path;
    }

    getProducts = async () => {

        try {

            if (fs.existsSync(this.path)) {

                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;                

            } else {
                return [];
            }

        } catch (error) {
            console.log(error);
        }

    }

    getProductsById = async (id) => {

        try {

            if (fs.existsSync(this.path)) {

                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                const idFound = products.find((product) => product.id === id);
                idFound ? console.log(`El ID "${id}" ingresado corresponde al producto ${idFound.title}`) : console.log('No existe el ID ingresado');

            } else {
                return [];
            }

        } catch (error) {
            console.log(error);
        }

    }

    addProduct = async(title,description,price,thumbnail,code,stock,status,category) => {

        try {
            
            const products = await this.getProducts();

            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                status,
                category,
                stock
            };

            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1;
            }

            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            
        } catch (error) {
            console.log(error);
        }

    } 

    updateProduct = async (id, newValues) => {

        try {

            const flag = false;

            const mData = [];

            const products = await this.getProducts();

            const productFoundById = products.findIndex(product => product.id === id);

            const obj = Object.entries(newValues);

            obj.forEach((el) => {

                if (el[1] == "") {

                    flag = true;

                    mData.push(el[0]);

                }

            });

            if (flag) {

                console.log(`No se puede modificar el producto de Id:${id}\nFalta: ` + mData.flat());

                return;

            } else {

                if (productFoundById !== -1) {

                    products[productFoundById] = { ...products[productFoundById], ...newValues };

                    return await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));

                    /* if (await this.codeRepeat(newValues)) {

                        console.log(`El codigo de ${products[productFoundById].title} se repite`);

                        return this.products;

                    } else {

                        products[productFoundById] = { ...products[productFoundById], ...newValues };

                        return await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));

                    } */

                } else {

                    return console.log(`El Id: ${id} no se encuentra para ser modificado.`);

                }

            }

        } catch (error) {
            console.log(error);
        }

    }

    deleteProduct = async (id) => {

        try {

            if (fs.existsSync(this.path)) {

                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);

                const productsUpdate = products.filter(product => product.id !== id);

                await fs.promises.writeFile(this.path, JSON.stringify(productsUpdate, null, '\t'));

            } else {
                return [];
            }

        } catch (error) {
            console.log(error);
        }

    }

};