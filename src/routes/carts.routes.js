import { Router } from 'express';
import CartsManager from '../CartsManager.js';

const router = Router();

const cartManager = new CartsManager();

router.get('/', async (req, res)=>{
    try {
        let carts = await cartManager.getCarts();
        const limit = req.query.limit;
        if (limit) {
            carts = carts.slice(0, limit);
        }
        res.send({carts});
    } catch (error) {
        res.send('Error:', error);
    }
});

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.addCart();
        res.send({status:'success', payload: newCart});
    } catch (error) {
        res.send('Error:', error);
    }
})

router.get('/:cid', async (req, res)=>{
    try {
        const { cid } = req.params
        const cart = await cartManager.getCartById(parseInt(cid))
        res.send({ status: 'success', payload: cart})
    } catch (error) {
        res.send('Error:', error);
    }

});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    console.log(cid, pid, quantity);
    try {
        const newProduct = await cartManager.addProduct(parseInt(cid), parseInt(pid), quantity);
        res.send({status:'success', payload: newProduct});
    } catch (error) {
        res.send('Error:', error);
    }
})

export default router

