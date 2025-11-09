// src/pages/PlaceOrder.js
import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, cartItems, setCartItems, token, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log('Submitting order...');
    try {
      let orderItems = [];
      for (const item in cartItems) {
        for (const size in cartItems[item]) {
          if (cartItems[item][size] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === item));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[item][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case 'cod':
          const response = await axios.post('http://localhost:4000/api/order/place', orderData, { headers: { token } });
          console.log('Full API response:', response.data); // Debug: Inspect response
          if (response.data.success) {
            console.log('Navigating to orders...');
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        case 'stripe':
          const responseStripe = await axios.post('http://localhost:4000/api/order/stripe', orderData, { headers: { token } });
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        case 'chapa':
          try {
            if (!token) {
              toast.error('Please log in to proceed with payment');
              navigate('/login');
              return;
            }
            const responseChapa = await axios.post('http://localhost:4000/api/order/chapa', orderData, { headers: { token } });
            if (responseChapa.data.success) {
              const { checkout_url, orderId, tx_ref } = responseChapa.data;
              localStorage.setItem('chapa_orderId', orderId);
              localStorage.setItem('chapa_tx_ref', tx_ref);
              window.location.replace(checkout_url);
            } else {
              toast.error(responseChapa.data.message);
            }
          } catch (error) {
            console.error('Chapa Payment Error:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Failed to initiate Chapa payment');
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log('Error placing order:', error); // Log the error
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-6 lg:px-8 w-full"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3 animate-fadeIn">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:ring-accent focus:border-accent"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:ring-accent focus:border-accent"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:ring-accent focus:border-accent"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:ring-accent focus:border-accent"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:ring-accent focus:border-accent"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:ring-accent focus:border-accent"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:ring-accent focus:border-accent"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:ring-accent focus:border-accent"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full focus:ring-accent focus:border-accent"
          type="number"
          placeholder="Phone"
        />
      </div>
      {/*-------right side-------*/}
      <div className="mt-4 w-full sm:max-w-[400px]">
        <div className="mt-2 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-4">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/*-------payment collection-------*/}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod('stripe')}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md hover:bg-gray-50`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div
              onClick={() => setMethod('chapa')}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md hover:bg-gray-50`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'chapa' ? 'bg-green-400' : ''}`}
              ></p>
              <p className="text-green-900 text-sm font-medium mx-4">CHAPA</p>
            </div>
            <div
              onClick={() => setMethod('cod')}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md hover:bg-gray-50`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-primary text-white px-16 py-3 text-sm rounded-md hover:bg-accent transition-colors duration-300"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;