export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getAll = async(page) => {
        const products = await this.dao.getAll(page);
        return products;
    }
    getById = async(pid) => {
        const product = await this.dao.getById(pid);
        return product;
    }
    save = async(product) => {
        const productSaved = await this.dao.save(product);
        return productSaved;
    }
    update = async(pid, productToReplace) => {
        const productUpdated = await this.dao.update(pid, productToReplace);
        return productUpdated;
    }
    eliminate = async(pid) => {
        const productEliminated = await this.dao.eliminate(pid);
        return productEliminated;
    }
}