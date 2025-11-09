
import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChapaVerify = () => {
  const { navigate, token, setCartItems } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  // Manually parse query string to handle &amp; encoding
  const queryString = window.location.search.replace(/&amp;/g, '&');
  const queryParams = new URLSearchParams(queryString);
  const success = queryParams.get('success');
  let orderId = queryParams.get('orderId') || localStorage.getItem('chapa_orderId');
  let tx_ref = queryParams.get('tx_ref') || localStorage.getItem('chapa_tx_ref');

  const verifyPayment = async () => {
    try {
      // Log for debugging
      console.log('Current URL:', window.location.href);
      console.log('Raw Query String:', window.location.search);
      console.log('Parsed Query Params:', Object.fromEntries(queryParams));
      console.log('Token:', token);
      console.log('OrderId:', orderId);
      console.log('Tx_ref:', tx_ref);
      console.log('Success:', success);

      // Fallback to localStorage token
      const effectiveToken = token || localStorage.getItem('token');
      if (!effectiveToken) {
        toast.error('Please log in to verify the payment');
        navigate('/login');
        return;
      }

      // Check for missing payment details
      if (!orderId || !tx_ref) {
        toast.error('Missing payment details (orderId or tx_ref)');
        navigate('/cart');
        return;
      }

      // Verify payment with backend using GET
      const response = await axios.post(
        `http://localhost:4000/api/order/chapaverify?success=${success}&orderId=${orderId}&tx_ref=${tx_ref}`,
        { headers: { token: effectiveToken } }//tx_ref
      );

      if (response.data.success) {
        setCartItems({});
        toast.success('Payment verified successfully!');
        localStorage.removeItem('chapa_orderId');
        localStorage.removeItem('chapa_tx_ref');
        navigate('/orders');
      } else {
        toast.error(response.data.message || 'Payment verification failed');
        navigate('/cart');
      }
    } catch (error) {
      console.error('Chapa Verify Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to verify payment');
      navigate('/cart');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Verifying Chapa Payment...</p>
    </div>
  );
};

export default ChapaVerify;