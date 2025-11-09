
import express from 'express'
import { allOrders, placeOrder, placeOrderChapa, placeOrderStripe, updateStatus, userOrders,verifyStripe,chapaVerify } from '../Controler/orderController.js'
import adminAuth from '../Midlware/adminAuth.js'
import authUser from '../Midlware/auth.js'

const orderRouter=express.Router()

//Admin feature
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)
//payment feature
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/chapa',authUser,placeOrderChapa)

//user feature
orderRouter.post('/userorders',authUser,userOrders)
//verify payment
orderRouter.post('/verifystripe',authUser,verifyStripe)
//verify chapa
orderRouter.post('/chapaverify',chapaVerify)

export default orderRouter