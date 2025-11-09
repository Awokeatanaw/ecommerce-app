import OrderModel from "../Model/orderModel.js";
import userModel from "../Model/userModel.js"
import { Stripe } from 'stripe'
import axios from "axios";

//global variable
const currency='inr'
const deliveryCharge=10

//gateway initilize
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

//placing orders using COD method
const placeOrder=async(req,res)=>{
    try {

        const{userId,items,amount,address}=req.body;
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }
        const newOrder=new OrderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:'Order Placed'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//placing order by using stripe method
const placeOrderStripe=async(req,res)=>{
    try {
        
        const{userId,items,amount,address}=req.body;
        const{origin}=req.headers;

        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        }
        const newOrder=new OrderModel(orderData)
        await newOrder.save()

        const line_items=items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount:deliveryCharge*100
            },
            quantity:1
        })
        const session=await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment'
        })
        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//verify stripe
const verifyStripe=async (req,res) => {
    const{orderId,success,userId}=req.body
    try {
        if (success==="true") {
            await OrderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true})
        }else{
            await OrderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//placing order by using chapa ..........................................



const placeOrderChapa = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    // Input validation
    if (!userId || !items || !items.length || !amount || !address || !origin) {
      return res.status(400).json({ success: false, message: "Missing required fields or invalid origin" });
    }

    // Create and save order
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Chapa (Telebirr)",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    // Generate unique transaction reference
    const tx_ref = `tx-${newOrder._id}-${Date.now()}`;

    // Use backend URL for callback
    const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';
    const callbackUrl = `${BACKEND_URL}/api/order/chapaverify`;
    const returnUrl = `${origin}/chapaverify?success=true&orderId=${newOrder._id}&tx_ref=${tx_ref}`;

    // Log for debugging
    console.log('Backend URL:', BACKEND_URL);
    console.log('Callback URL:', callbackUrl);
    console.log('Return URL:', returnUrl);
    console.log('Order Data:', orderData);

    // Prepare Chapa initialization data
    const data = {
      amount: String(amount),
      currency: "ETB",
      email: address.email || "customer@example.com",
      first_name: address.firstName || "Customer",
      last_name: address.lastName || "User",
      tx_ref,
      callback_url: callbackUrl,
      return_url: returnUrl,
      customization: {
        title: "Order Payment",
        description: `Payment for order ${newOrder._id}`,
      },
    };

    // Validate Chapa secret key
    if (!process.env.CHAPA_SECRET_KEY) {
      throw new Error("Chapa secret key is not configured");
    }

    // Send request to Chapa API
    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    ).catch(error => {
      throw new Error(error.response?.data?.message || error.message || "Failed to initialize Chapa transaction");
    });

    // Log Chapa response
    console.log('Chapa API Response:', response.data);

    // Check if Chapa response is successful
    if (response.data.status !== "success" || !response.data.data?.checkout_url) {
      throw new Error(response.data.message || "Failed to initialize Chapa transaction");
    }

    // Send checkout URL back to frontend
    res.json({
      success: true,
      checkout_url: response.data.data.checkout_url,
      tx_ref,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Chapa Init Error:", {
      message: error.message,
      response: error.response?.data,
    });
    // Delete the order if Chapa initialization fails
    if (newOrder) {
      await OrderModel.findByIdAndDelete(newOrder._id);
    }
    res.status(500).json({
      success: false,
      message: error.message || "Failed to process Chapa payment",
    });
  }
};

const chapaVerify = async (req, res) => {
  try {
    const { orderId, tx_ref, success } = req.query;

    // Log query parameters
    console.log('Verify Query Params:', { orderId, tx_ref, success });

    if (!orderId || !tx_ref) {
      return res.status(400).json({ success: false, message: "Missing orderId or tx_ref" });
    }

    // Verify transaction with Chapa API
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    ).catch(error => {
      throw new Error(error.response?.data?.message || error.message || "Failed to verify Chapa transaction");
    });

    // Log Chapa verification response
    console.log('Chapa Verify Response:', response.data);

    if (response.data.status === "success" && success === "true") {
      // Update order payment status
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });
      // Clear user cart
      const order = await OrderModel.findById(orderId);
      if (order && order.userId) {
        await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
      }
      return res.json({ success: true, message: "Payment verified successfully" });
    } else {
      // Delete order if payment failed
      await OrderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Chapa Verify Error:", {
      message: error.message,
      response: error.response?.data,
    });
    res.status(500).json({
      success: false,
      message: error.message || "Failed to verify Chapa payment",
    });
  }
};





//all orders data for admin panale
const allOrders=async(req,res)=>{
    try {
        const orders=await OrderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
//user order data for frontend
const userOrders=async(req,res)=>{
    try {
        const{userId}=req.body
        const orders=await OrderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//update order status from admin panale
const updateStatus=async(req,res)=>{

    try {
        const {orderId,status}=req.body
        await OrderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"status updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

export {placeOrder,placeOrderStripe,placeOrderChapa,allOrders,userOrders,updateStatus,verifyStripe,chapaVerify}

