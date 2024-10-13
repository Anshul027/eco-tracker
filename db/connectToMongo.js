const mongoose = require("mongoose");

const connectToMongo = async (dbName) => {
  try {
    const DB_OPTIONS = {
      dbName: dbName,
    };
    // Attempting to connect with DB
    await mongoose.connect(process.env.MONOGO_DB_URI, DB_OPTIONS);
    console.log("Connected to mongoDb succssfully....");
  } catch (error) {
    console.log("Error in database conection : ", error.message);
  }
};

module.exports = connectToMongo;
