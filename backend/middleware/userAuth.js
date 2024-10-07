import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const { token } = req.headers

    if (!token) {
        return res.json({ success: false, message: 'You are not authorized, Please login' })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        req.body.userId = tokenDecode.id

        next()
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export default userAuth;