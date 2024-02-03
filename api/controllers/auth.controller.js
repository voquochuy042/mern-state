const { User } = require('../models/user.model')
const errorHandler = require('../utils/error')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authController = {
    signup: async (req, res, next) => {
        try {
            const { username, email, password } = req.body
            // console.log(username, email, password);
            const hashedPassword = bcrypt.hashSync(password, 10)
            const newUser = new User({ username, email, password: hashedPassword })
            const savedUser = await newUser.save()
            res.status(200).json(savedUser)
        } catch (error) {
            // res.status(500).json(error)
            next(error)
        }
    },
    signIn: async (req, res, next) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) return next(errorHandler(404, "User not found"))
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) return next(errorHandler(400, "Invalid password"))
            const token = jwt.sign({ _id: user._id }, process.env.jwt_secret)
            const { password: pass, ...rest } = user._doc
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        } catch (error) {

        }
    }
}
module.exports = authController