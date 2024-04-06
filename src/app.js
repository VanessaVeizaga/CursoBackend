const express = require('express');

const { ProductManager } = require('./ProductManager');

const app = express();

app.use(express.urlencoded({extended:true}))


app.get('/products', async (req, res)=>{
    try {
        const productManager = new ProductManager();
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

app.get('/products/:pid', async (req, res)=>{
    try {
        const productManager = new ProductManager();
        let products = await productManager.getProducts();
        const pId = parseInt(req.params.pid);
        const product = products.find(product => product.id === pId);
        if (!product) return res.send("Producto no encontrado")
        res.send(product);
    } catch (error) {
        res.send('Error:', error);
    }
});

app.listen(8080, ()=>console.log("¡Servidor arriba en el puerto 8080!"));
