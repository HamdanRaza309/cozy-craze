import validator from 'validator'
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// route for user registeration
const regiterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // checking user already exists or not 
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.json({ success: false, message: 'User already exists' });
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' });
        }

        if (password.length < 5) {
            return res.json({ success: false, message: 'Your password is too short' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({ success: true, token })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Please enter correct credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Please enter correct creadentials' })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// route for admin login
const adminLogin = async (req, res) => {
    res.send('adminLogin')

}

export { regiterUser, loginUser, adminLogin }