const { User } = require('../models/user.model')
const errorHandler = require('../utils/error')
const bcrypt = require('bcryptjs')


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
    }
}
module.exports = authController