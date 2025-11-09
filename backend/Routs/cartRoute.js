
import express from 'express'
import { addToCart, getUserCart, updateCart } from '../Controler/cartController.js'
import authUser from '../Midlware/auth.js'
const cartRouter=express.Router()

cartRouter.post('/get',authUser,getUserCart)
cartRouter.post('/add',authUser,addToCart)
cartRouter.post('/update',authUser,updateCart)

export default cartRouter