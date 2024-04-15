import Express from 'express';
import cors from 'cors';
import db from './database/db.js';
import productRoutes from './routes/routesProducts.js';
import userRoutes from './routes/routesUser.js';
import ProductModel from './models/ProductModel.js';
import {pay} from './routes/pay.js';
const app = Express();

app.use(cors()); 
app.use(Express.json()); 
app.use('/products', productRoutes); 
app.use('/users', userRoutes); 
app.use('/payment', pay); 


try {
    db.authenticate()
    console.log('successful connection to the db');
} catch (error) {
    console.log(`The connection error was ${error}`);
}

const PORT = process.env.PORT || 8081;

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})


const products = await ProductModel.findAll({
    attributes: ['id', 'stock', 'stockMin', 'name']
})


let productsStock = {}
let productMinStock = {}


products.forEach(product => {
    productsStock[product.dataValues.id] = product.dataValues.stock;
});
products.forEach(product => {
    productMinStock[product.dataValues.id] = {stockMin: product.dataValues.stockMin, name: product.dataValues.name};
});
console.log(productMinStock);
export {productsStock, productMinStock};