
import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors'
import 'dotenv/config'
import connectDB from './Config/mongodb.js'
import userRouter from './Routs/userRoute.js'
import productRouter from './Routs/productRouter.js'
import cartRouter from './Routs/cartRoute.js';
import orderRouter from './Routs/orderRoute.js';

// app config
const app=express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port=process.env.PORT ||4000
connectDB(),

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//midleware
app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

//api endpoint
app.get('/',(req,res)=>{
    res.send('api working')
})

app.listen(port,()=>console.log(`server started on server port:`+ port))