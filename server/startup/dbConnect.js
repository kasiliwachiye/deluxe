const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://127.0.0.1:27017/deluxe`);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnect;
