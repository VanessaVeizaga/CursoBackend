import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const router = Router();

const productManager = new ProductManager();

router.get('/', async (req, res)=>{
    try {
        //const productManager = new ProductManager();
        let products = await productManager.getProducts();
        const limit = req.query.limit;
        if (limit) {
            products = products.slice(0, limit);
        }
        res.send({products});
    } catch (error) {
        res.send('Error:', error);
    }
});

router.post('/', async (req, res) => {
    const {title, description, price, thumbnail, code, stock, status, category} = req.body
    try {
        const newProduct = await productManager.addProduct(title, description, price, thumbnail, code, stock, status, category)
        res.send({status:'success', payload: newProduct});
    } catch (error) {
        res.send('Error:', error);
    }
})

router.get('/:pid', async (req, res)=>{
    try {
        const { pid } = req.params
        const product = await productManager.getProductById(parseInt(pid))
        res.send({ status: 'success', payload: product})
    } catch (error) {
        res.send('Error:', error);
    }

});
router.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const productToUpdate = req.body
    try {
        const updatedProduct = await productManager.updateProduct(parseInt(pid), productToUpdate)
        res.send({status:'success', payload: updatedProduct})
    } catch (error) {
        res.send('Error:', error);
    }
})

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    const products = await productManager.deleteProduct(parseInt(pid))
    res.send({ status: 'success', payload: products})
    
})

export default router

