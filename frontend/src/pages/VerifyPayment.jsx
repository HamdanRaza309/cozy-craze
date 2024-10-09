import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function VerifyPayment() {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
    const [searchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token || !orderId) {
                return null;
            }

            const response = await axios.post(
                `${backendUrl}api/order/verifyStripe`,
                { success, orderId },
                { headers: { token } }
            );

            if (response.data.success) {
                setCartItems({});
                navigate('/orders');
            } else {
                navigate('/cart');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [token, orderId, success]);

    return (
        <div className="flex justify-center items-center h-[50vh]">
            Verifying Payment...
        </div>
    );

}

export default VerifyPayment;
