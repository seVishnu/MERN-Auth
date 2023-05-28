import{connect} from "mongoose";

const connectDb = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI);
    console.log("connected to db");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
export default connectDb;
