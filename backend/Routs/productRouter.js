
import express from 'express'
import { addProduct,listProduct,removeProduct,singleProduct } from "../Controler/productController.js"
import upload from '../Midlware/multer.js';
import adminAuth from '../Midlware/adminAuth.js';

const productRouter=express.Router();
productRouter.post('/add',adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);
productRouter.post('/remove',adminAuth,removeProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProduct);

export default productRouter