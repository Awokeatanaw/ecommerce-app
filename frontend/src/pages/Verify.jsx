
import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
    const{navigate,token,setCartItems}=useContext(ShopContext)
    const [searchParams,setSearchParams]=useSearchParams()

    const success=searchParams.get('success')
    const orderId=searchParams.get('orderId')
    const verifyPayment=async () => {
        try {
            if (!token) {
                return null
            }
            
            const response=await axios.post('http://localhost:4000/api/order/verifystripe',{success,orderId},{headers:{token}})
        
            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/cart')
                
            }
        } catch (error) {
            console.log('Error:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Payment verification failed');
            
        }
        
    }
    useEffect(()=>{
        verifyPayment()
    },[token])
  return (
    <div>
      <p>verify</p>
    </div>
  )
}

export default Verify
