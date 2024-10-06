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
        const { userId, itemId, size, quantity } = req.body

        if (!userId || !itemId || !size || quantity < 1) {
            return res.json({ success: false, message: 'Invalid data provided' });
        }

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}

        if (cartData[itemId] && cartData[itemId][size]) {
            cartData[itemId][size] = quantity;
        } else {
            return res.json({ success: false, message: "Item or size not found in cart" });
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: 'Cart updated' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

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