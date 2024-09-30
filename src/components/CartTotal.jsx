import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

function CartTotal() {

    const { currency, deliveryFee, getCartAmount } = useContext(ShopContext);


    return (
        <div className='w-full'>
            <div className="text-2xl">
                <Title text1={'CART'} text2={'TOTAL'} />
            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency}{getCartAmount()}.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>{currency}{deliveryFee}.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <b>Total</b>
                    <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00</b>
                </div>
                <hr />
            </div>
        </div>
    )
}

export default CartTotal