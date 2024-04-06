
const { log } = require('console');
const fs = require('fs')

class ProductManager {
    #path;
    constructor() {
        this.#path = './products.json'
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        this.#validateParameters(title, description, price, thumbnail, code, stock);
        await this.#validateCode(code);
        const product = {
          id: await this.#getNextId(),
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        let products = await this.#getObject();
        products.push(product);
        this.#setObject(products);
      }

    #validateParameters(title, description, price, thumbnail, code, stock) {
        const parameters = [title, description, price, thumbnail, code, stock];
        parameters.forEach(element => {
            if(typeof element === "undefined") {
                throw new Error("Al agregar un nuevo producto, debe ingresar todos los parámetros.")
            }   
        });
    }

    async #getObject() {
        try {
            let products = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8'))
            return products;
        } catch(error) {
            return [];
        }
    }

    async #setObject(products) {
        await fs.promises.writeFile(this.#path, JSON.stringify(products));
    }

    async #validateCode(code) {
        let products = await this.#getObject()
        const product = products.find((prod) => prod.code === code);
        if (product) {
            throw new Error("Ya se encuentra registrado un producto con el código ingresado.")
        }
    }

    async #getNextId() {
        let products = await this.#getObject()
        if (products.length === 0) {
          return 1;
        }
        return products.at(-1).id + 1;
    }

    async getProducts() {
        let products = await this.#getObject();
        console.log(products)
        return products; 
    }

    async getProductById(id) {
        let products = await this.#getObject();
        const product = products.find((prod) => prod.id === id);
        if (!product) {
            throw new Error("Not found");
        }
        console.log(product);
    };

    async updateProduct(id, key, value) {
        if (key == 'id') {
            throw new Error("The id property cannot be modified")
        }
        try {
            let products = await this.#getObject();
            const product = products.find((prod) => prod.id === id);
            let indexProduct = products.indexOf(product);
            products[indexProduct][key] = value;
            this.#setObject(products);
        } catch(error) {
            throw new Error("Product not found");
        }
    }

    async deleteProduct(id) {
        let products = await this.#getObject();
        try {
            const product = products.find((prod) => prod.id === id);
            let indexProduct = products.indexOf(product);
            products.splice(indexProduct, 1);
            this.#setObject(products);
        } catch(error) {
            throw new Error("Product not found");
        }  
    };
} 

module.exports = { ProductManager };






     









