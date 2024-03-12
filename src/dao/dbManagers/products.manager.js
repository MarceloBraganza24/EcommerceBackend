import { productsModel } from '../dbManagers/models/products.model.js'

export default class Products {
    constructor() {
        console.log('Working products with DB...');
    }
    getAll = async (page) => {
        const products = await productsModel.paginate({}, {limit: 5, page, lean: true});
        return products; 
    }
    getById = async (pid) => {
        const product = await productsModel.findById(pid);
        return product; 
    }
    save = async (product) => {
        const productSaved = await productsModel.create(product);
        return productSaved;
    }
    update = async (pid, productToReplace) => {
        const productUpdated = await productsModel.findByIdAndUpdate(pid, productToReplace);
        return productUpdated;
    }
    eliminate = async (pid) => {
        const productEliminated = await productsModel.findByIdAndDelete(pid);
        return productEliminated;
    }
}