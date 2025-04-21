import mongoose from "mongoose";
import mysql from "mysql2/promise";
import config from "../config";

export default class ConnectionChecker {
	static async checkMongo(): Promise<void> {
		try {
			if (mongoose.connection.readyState !== 1) {
				throw new Error("MongoDB is not connected");
			}
			console.log("✅ MongoDB connection is healthy");
		} catch (error) {
			console.error("❌ MongoDB check failed:", error);
			throw error;
		}
	}

	static async checkMySQL(): Promise<void> {
		let connection;
		try {
			connection = await mysql.createConnection(config.conn);
			await connection.ping();
			console.log("✅ MySQL connection is healthy");
		} catch (error) {
			console.error("❌ MySQL check failed:", error);
			throw error;
		} finally {
			if (connection) {
				await connection.end();
			}
		}
	}

	static async checkAll(): Promise<void> {
		await this.checkMongo();
		await this.checkMySQL();
	}
}
