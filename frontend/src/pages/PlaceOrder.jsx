import React, { useContext, useState } from 'react';
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from '../frontend_assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function PlaceOrder() {

    const { navigate, backendUrl, cartItems, setCartItems, deliveryFee, token, getCartItems, getCartAmount, products } = useContext(ShopContext);
    const [paymentMethod, setPaymentMethod] = useState('cod');
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
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            let orderItems = []

            for (const items in cartItems) {

                for (const item in cartItems[items]) {
                    if (cartItems[items][item]) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + deliveryFee
            }

            switch (paymentMethod) {
                // API Call for Cash on Delivery (COD)
                case 'cod':
                    if (token) {
                        const response = await axios.post(`${backendUrl}api/order/place`, orderData, { headers: { token } });
                        if (response.data.success) {
                            setCartItems({});
                            navigate('/orders');
                        } else {
                            toast.error(response.data.message);
                        }
                    }
                    break;

                case 'stripe':
                    if (token) {
                        const response = await axios.post(`${backendUrl}api/order/stripe`, orderData, { headers: { token } });
                        if (response.data.success) {
                            const { session_url } = response.data
                            window.location.replace(session_url)
                        } else {
                            toast.error(response.data.message);
                        }
                    }
                    break;

                case 'razorPay':
                    if (token) {
                        toast.info('Sorry, this method is not available yet')
                    }
                    break;

                default:
                    toast.error('Invalid payment method');
                    break;
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <form
            onSubmit={onSubmitHandler}
            className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

            {/* Left Side */}
            <div className="flex-flex-col gap-4 w-full max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name='firstName'
                        value={formData.firstName}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3'
                        type="text"
                        placeholder='First Name' />
                    <input
                        required
                        onChange={onChangeHandler}
                        name='lastName'
                        value={formData.lastName}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3'
                        type="text"
                        placeholder='Last Name' />
                </div>

                <input
                    required
                    onChange={onChangeHandler}
                    name='email'
                    value={formData.email}
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3'
                    type="email"
                    placeholder='Email Adress' />
                <input
                    required
                    onChange={onChangeHandler}
                    name='street'
                    value={formData.street}
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3'
                    type="text"
                    placeholder='Street' />

                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name='city'
                        value={formData.city}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3'
                        type="text"
                        placeholder='City' />
                    <input
                        required
                        onChange={onChangeHandler}
                        name='state'
                        value={formData.state}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3'
                        type="text"
                        placeholder='State' />
                </div>

                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name='zipcode'
                        value={formData.zipcode}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3'
                        type="number"
                        placeholder='Zipcode' />
                    <input
                        required
                        onChange={onChangeHandler}
                        name='country'
                        value={formData.country}
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3'
                        type="text"
                        placeholder='Country' />
                </div>

                <input
                    required
                    onChange={onChangeHandler}
                    name='phone'
                    value={formData.phone}
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full mt-3'
                    type="number"
                    placeholder='Phone ' />
            </div>

            {/* Right Side */}
            <div className='mt-8 '>

                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>

                <div className="mt-8">
                    <Title text1={'PAYMENT'} text2={'METHOD'} />

                    {/* Payment Method Selection */}
                    <div
                        className="flex flex-col lg:flex-row gap-3">

                        <div
                            onClick={() => setPaymentMethod('stripe')}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'stripe' ? 'bg-green-600' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="stripe_logo" />
                        </div>

                        <div
                            onClick={() => setPaymentMethod('razorPay')}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'razorPay' ? 'bg-green-600' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="razorpay_logo" />
                        </div>

                        <div
                            onClick={() => setPaymentMethod('cod')}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'cod' ? 'bg-green-600' : ''}`}></p>
                            <p className='text-gray-600 text-sm font-bold mx-4'>CASH ON DELIVERY</p>
                        </div>

                    </div>
                    <div className="w-full text-end mt-8">

                        <button
                            type='submit'
                            className='bg-black text-white px-16 py-3 text-sm active:bg-gray-700'>
                            PLACE ORDER
                        </button>

                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder