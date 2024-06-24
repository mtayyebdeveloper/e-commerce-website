import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(`Database connecting error`);
    process.exit(1);
  }
};

export default connectDB;
