
import fs from 'fs';

class CartsManager {
    #path;
    constructor() {
        this.#path = './carts.json';
    }

    async addCart() {
        const cart = {
          id: await this.#getNextId(),
          arrayProducts: []
        };
        let carts = await this.#getObject();
        carts.push(cart);
        await this.#setObject(carts);
        return cart;
      }

    async addProduct(cid, pid, quantity) {
        let carts = await this.#getObject();
        const cart = carts.find((cart) => cart.id === cid)
        if (!cart) {
            throw new Error("Cart not found");
        }
        let indexCart = carts.indexOf(cart);
        let contentCart = carts[indexCart].arrayProducts
        if (contentCart.length === 0) {
            carts[indexCart].arrayProducts.push({ product: pid, quantity: quantity})
        } else {
            let found = false
            for (let i = 0; i < contentCart.length; i++) {
               if(contentCart[i].product === pid) {
                    carts[indexCart].arrayProducts[i].quantity += quantity
                    found = true
                    break
               }
            }
            if (!found) {
                carts[indexCart].arrayProducts.push({ product: pid, quantity: quantity})
            }
        }
        await this.#setObject(carts)
        return {product: pid, quantity: quantity}
    }

    async #getObject() {
        try {
            let carts = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8'))
            return carts;
        } catch(error) {
            return [];
        }
    }

    async #setObject(carts) {
        await fs.promises.writeFile(this.#path, JSON.stringify(carts));
    }

    async #getNextId() {
        let carts = await this.#getObject()
        if (carts.length === 0) {
          return 1;
        }
        return carts.at(-1).id + 1;
    }

    async getCarts() {
        let carts = await this.#getObject();
        return carts; 
    }

    async getCartById(id) {
        let carts = await this.#getObject();
        const cart = carts.find((cart) => cart.id === id);
        if (!cart) {
            throw new Error("Not found");
        }
        return cart.arrayProducts;
    };
} 

export default CartsManager






     









