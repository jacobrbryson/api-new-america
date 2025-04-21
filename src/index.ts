require("dotenv").config();

import express from "express";

import config from "./config";
import { connectMongo } from "./db/mongo";
import { initMysqlPool } from "./db/mysql";
import ConnectionChecker from "./helpers/db";
import routes from "./routes";

initMysqlPool();
const app = express();

app.use(express.urlencoded({ extended: false })).use(express.json());

const startServer = async () => {
	try {
		await connectMongo();
		await ConnectionChecker.checkAll(); // ✅ Run both connection checks

		app.use("/", routes);

		app.listen(config.port, () =>
			console.log(
				`🚀 Server is running at http://localhost:${config.port}`
			)
		);
	} catch (err) {
		console.error("❌ Server startup failed:", err);
		process.exit(1);
	}
};

startServer();
