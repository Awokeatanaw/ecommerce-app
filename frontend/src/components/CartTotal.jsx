
import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

  const {currency,delivery_fee,getCartAmount,getDeliveryFee}=useContext(ShopContext);

  const deliveryFee = getDeliveryFee();

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>
      <div className='flex flex-col mt-2 text-sm'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency} {getCartAmount()}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
             <p>Shiping fee</p>
             <p>{currency} {deliveryFee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <b>Total</b>
            <p>{currency} {getCartAmount()===0? 0:getCartAmount()+deliveryFee}.00</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
