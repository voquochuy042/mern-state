const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv")

const userRoute = require("./routes/user.route")
const authRoute = require("./routes/auth.route")

app.use(express.json())
dotenv.config()
mongoose.connect(process.env.mongodb_url)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
app.listen(3000, () => console.log('Server running on port 3000'))
app.use("/v1/user", userRoute)
app.use("/v1/auth", authRoute)