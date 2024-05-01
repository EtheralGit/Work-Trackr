// import mongoose
import mongoose from "mongoose";

const MongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Success : Database Connected");
  } catch (error) {
    console.log(error);
  }
};

export default MongoConnect;
