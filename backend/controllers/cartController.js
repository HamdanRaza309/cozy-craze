import userModel from "../models/userModel.js"

// add products to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body

        if (!userId || !itemId || !size) {
            return res.json({ success: false, message: 'Invalid data provided' });
        }

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: 'Added To Cart' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        // Validate input
        if (!userId || !itemId || !size || quantity < 0) {
            return res.json({ success: false, message: 'Invalid data provided' });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        let cartData = userData.cartData || {};

        // Handle deletion when quantity is 0
        if (quantity === 0) {
            if (cartData[itemId] && cartData[itemId][size]) {
                delete cartData[itemId][size]; // Remove the specific size of the item

                // If the item has no sizes left, remove the item entirely
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            } else {
                return res.json({ success: false, message: "Item or size not found in cart" });
            }
        } else {
            // Update quantity if size exists
            if (cartData[itemId] && cartData[itemId][size]) {
                cartData[itemId][size] = quantity;
            } else {
                return res.json({ success: false, message: "Item or size not found in cart" });
            }
        }

        // Update the user's cart
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: quantity === 0 ? 'Item removed from cart' : 'Cart updated' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body

        if (!userId) {
            return res.json({ success: false, message: 'Invalid data provided' });
        }

        const userData = await userModel.findById(userId)
        let cartData = userData.cartData || {}

        res.json({ success: true, cartData })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export { addToCart, updateCart, getUserCart };