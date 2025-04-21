import mongoose from "mongoose";
import config from "../config";

export const connectMongo = async () => {
	try {
		await mongoose.connect(config.mongo.uri);
		console.log("✅ MongoDB connected");
	} catch (error) {
		console.error("❌ MongoDB connection error:", error);
		process.exit(1);
	}
};

export default mongoose;
