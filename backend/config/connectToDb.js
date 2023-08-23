const mongoose = require('mongoose');
require("dotenv").config()

async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to Database");
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = connectToDb;