const mongoose = require("mongoose");

const MONGO_URI  = process.env.MONGO_URI || 'mongodb+srv://admin:admin@itp-cluster.8lmwo.mongodb.net/ITP?retryWrites=true&w=majority';

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};