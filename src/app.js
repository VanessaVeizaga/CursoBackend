import express from 'express';
import ProductManager from './ProductManager.js';
import productsRouter from './routes/products.routes.js';
import CartsManager from './CartsManager.js';
import cartsRouter from './routes/carts.routes.js';
const app = express();

app.use(express.urlencoded({extended:true}))

//para poder leer los json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter)

app.use('/api/carts', cartsRouter)

app.listen(8080, ()=>console.log("¡Servidor arriba en el puerto 8080!"));
