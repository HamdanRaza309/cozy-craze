import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from "../components/Title";
import CartTotal from '../components/CartTotal';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Cart() {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let tempData = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        tempData.push({
                            _id: items,
                            size: item,
                            quantity: cartItems[items][item],
                        });
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, products]);

    return (
        <div className='border-t pt-14'>
            <div className="text-2xl mb-3">
                <Title text1={'YOUR'} text2={'CART'} />
            </div>
            <div>
                {cartData.length > 0 ? (
                    cartData.map((item, index) => {
                        const productData = products.find((product) => product._id === item._id);

                        return (
                            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.54fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-'>
                                <div className='flex items-start gap-6'>
                                    <img src={productData.images[0]} alt='product img' className='w-16 sm:w-20' />
                                    <div>
                                        <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                        <div className="flex items-center gap-5 mt-2">
                                            <p>{currency}{productData.price}</p>
                                            <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                                    type="number"
                                    min={1}
                                    defaultValue={item.quantity}
                                />
                                <FontAwesomeIcon
                                    onClick={() => updateQuantity(item._id, item.size, 0)}
                                    className='cursor-pointer w-4 sm:w-5 mr-4 text-gray-500 hover:text-red-500 transition-colors duration-200'
                                    icon={faTrash}
                                />

                            </div>
                        );
                    })
                ) : (
                    <div className="text-center text-gray-500 my-10">
                        <p>Your cart is empty.</p>
                        <p>Add items to your cart to proceed.</p>
                    </div>
                )}
            </div>
            {cartData.length > 0 && (
                <div className="flex justify-end my-20">
                    <div className="w-full sm:w-[450px]">
                        <CartTotal />
                        <div className="w-full text-end">
                            <button
                                onClick={() => navigate('/place-order')}
                                className='my-1 btnForWhiteBg'
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
