import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

// Global variables
const currency = 'AED';
const deliveryCharges = 10;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing order using COD method
const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: 'Order Placed' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


// Placing order using Stripe method
const placeOrderStripe = async (req, res) => {
    try {
        // Destructure the incoming request body
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        // Validate the required fields
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Create the order data object
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now()
        };

        // Create and save the new order
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Prepare the line items for Stripe checkout
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100  // Stripe accepts amounts in cents (multiplying by 100)
            },
            quantity: item.quantity
        }));

        // Add delivery charges as a separate line item
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharges * 100  // Convert delivery charges to cents
            },
            quantity: 1
        });

        // Create a checkout session with Stripe
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        });

        // Send the checkout session URL to the client
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
};



// placing order using razorpay method
const placeOrderRazorpay = async (req, res) => {

}

// all orders data for admin panel
const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({});
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// user order data for frontend
const userOrders = async (req, res) => {
    try {

        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// update order status from admin panel
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { placeOrderCOD, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };