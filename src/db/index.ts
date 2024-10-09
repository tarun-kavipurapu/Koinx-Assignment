import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error(
        'MONGODB_URI is not defined in the environment variables',
      );
    }
    const connectionInstance = await mongoose.connect(mongoUri);

    console.log(
      `\n☘️  MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`,
    );
  } catch (error) {
    console.error('MONGODB connection Database Error', error);
    process.exit(1);
  }
};
export default connectDB;
