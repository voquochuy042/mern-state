
const app = require('express')()
const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config()
mongoose.connect(process.env.mongodb_url)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
app.listen(3000, () => console.log('Server running on port 3000'))