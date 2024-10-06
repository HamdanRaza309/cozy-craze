import express from 'express'
import { allOrders, placeOrderCOD, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js'
import userAuth from '../middleware/userAuth.js';

const orderRouter = express.Router();

// admin features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('status', adminAuth, updateStatus);

// Payment methods
orderRouter.post('/place', userAuth, placeOrderCOD);
orderRouter.post('/stripe', userAuth, placeOrderStripe);
orderRouter.post('/razorpay', userAuth, placeOrderRazorpay);

// user feature
orderRouter.post('/userorders', userAuth, userOrders)

export default orderRouter;