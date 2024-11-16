const mongoose = require("mongoose");

const mongooseConnect = mongoose.connect("mongodb://127.0.0.1:27017/NoSQLDB"); // Connect to MongoDB
console.log("Connected to MongoDB");

exports.mongooseConnect = mongooseConnect;
