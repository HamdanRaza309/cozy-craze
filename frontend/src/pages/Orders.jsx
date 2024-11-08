import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from "../components/Title";
import axios from 'axios';

function Orders() {
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);

    const loadOrderData = async () => {
        try {
            if (!token) {
                return null;
            }

            const response = await axios.post(`${backendUrl}api/order/userorders`, {}, { headers: { token } });

            if (response.data.success) {
                let allOrderItems = [];
                response.data.orders.forEach((order) => {
                    order.items.forEach((item) => {
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;
                        allOrderItems.push(item);
                    });
                });
                setOrderData(allOrderItems.reverse());
            }
        } catch (error) {
            console.error(error); // Added error handling
        }
    };

    useEffect(() => {
        loadOrderData();
    }, [token]);

    return (
        <div className='border-t pt-6 bg-gray-50'>
            <div className='p-2 text-3xl font-semibold'>
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            {/* <div className=''> */}
            {orderData.length > 0 ? (
                orderData.map((item, index) => (
                    <div key={index} className='bg-white shadow-md p-6 mb-1 border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                        <div className='flex items-start text-sm gap-4 md:gap-6'>
                            <img className='w-20 h-20 object-cover rounded' src={item.images[0]} alt="product img" />
                            <div className='flex flex-col'>
                                <p className='text-lg font-semibold'>{item.name}</p>
                                <div className='flex items-center flex-wrap gap-3 mt-2 text-base text-gray-700'>
                                    <p className='font-bold'>{currency}{item.price}</p>
                                    <p className='text-gray-600'>Quantity: {item.quantity}</p>
                                    <p className='text-gray-600'>Size: {item.size}</p>
                                </div>
                                <p className='mt-2 text-gray-500'>Date: <span>{new Date(item.date).toDateString()}</span></p>
                                <p className='mt-2 text-gray-500'>Payment Method: <span>{item.paymentMethod}</span></p>
                            </div>
                        </div>
                        <div className='md:w-1/3 flex flex-wrap justify-between items-center'>
                            <div className='flex items-center gap-2'>
                                <p className={`min-w-2 h-2 rounded-full bg-green-600`}></p>
                                <p className='text-sm md:text-base font-semibold'>{item.status}</p>
                            </div>
                            <button onClick={loadOrderData} className='btnForWhiteBg'>
                                Track Order
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className='text-center text-gray-500'>
                    <p>No orders found.</p>
                </div>
            )}
            {/* </div> */}
        </div>
    );
}

export default Orders;
