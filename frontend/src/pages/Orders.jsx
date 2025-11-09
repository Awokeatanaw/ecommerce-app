// src/pages/Orders.js
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify'; // Added missing import

const Orders = () => {
  const { token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post('http://localhost:4000/api/order/userorders', {}, { headers: { token } });
      
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error(error.response?.data?.message || 'Failed to load orders');
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 px-4 sm:px-6 lg:px-8 w-full min-h-[80vh] bg-gray-50">
      <div className="text-2xl sm:text-3xl mb-6 animate-fadeIn">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div className="space-y-4">
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b bg-white shadow-sm rounded-md hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4 p-4"
            >
              <div className="flex items-start gap-6 text-sm sm:text-base">
                <img
                  className="w-16 sm:w-20 object-cover rounded-md"
                  src={`http://localhost:4000/${item.image[0]}`}
                  alt={item.name}
                />
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <div className="flex items-center gap-4 mt-2 text-gray-600">
                    <p className="text-lg font-semibold">{currency}{item.price}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1 text-gray-500">
                    Date: <span>{new Date(item.date).toLocaleDateString()}</span>
                  </p>
                  <p className="mt-1 text-gray-500">
                    Payment: <span>{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:w-1/3">
                <div className="flex items-center gap-2">
                  <p
                    className={`min-w-2 h-2 rounded-full ${
                      item.status === 'delivered'
                        ? 'bg-green-500'
                        : item.status === 'shipped'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  ></p>
                  <p className="text-sm md:text-base font-medium text-gray-700">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="border border-primary text-primary px-4 py-2 text-sm font-medium rounded-md hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-sm sm:text-base py-4">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;