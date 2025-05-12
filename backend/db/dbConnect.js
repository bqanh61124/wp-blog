const mongoose = require("mongoose");

async function dbConnect() {
  try {
    await mongoose.connect('mongodb+srv://bquanganh2004:SXg4D5bZyX2J5eHf@cluster0.zuyw3gf.mongodb.net/simple_blog?retryWrites=true&w=majority&appName=Cluster0');
    console.log("Successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = dbConnect; 