const { User } = require('../models/user.model')
const UserController = {
    getStatus: async (req, res) => {
        res.status(200).json("Hello from user controller")
    },
}
module.exports = UserController 