const mongoose = require("mongoose");
const db =
  "mongodb+srv://dbadmin:fsadgroup21@cluster0.enzauxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 ";
/* Replace <password> with your database password */

mongoose.set("strictQuery", true, "useNewUrlParser", true);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;