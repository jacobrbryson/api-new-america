import mysql from "mysql2";
import config from "../config";

let pool: mysql.Pool;

export const initMysqlPool = (): mysql.Pool => {
	pool = mysql.createPool(config.conn);

	pool.getConnection((err, connection) => {
		if (err) {
			console.error("❌ MySQL connection error:", err);
		}

		if (connection) {
			connection.release();
			console.log("✅ MySQL pool initialized");
		}
	});

	return pool;
};

export const getMysqlPool = (): mysql.Pool => {
	if (!pool) {
		throw new Error(
			"MySQL pool not initialized. Call initMysqlPool() first."
		);
	}
	return pool;
};

export default getMysqlPool;
