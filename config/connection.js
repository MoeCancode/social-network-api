const mongoose = require("mongoose");

const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/socialMediaDB";

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  module.exports= mongoose.connection;