import mysql from "mysql2";
import config from "../config";

let pool = mysql.createPool(config.conn);

pool.getConnection((err, connection) => {
	if(err) console.error(err);

	if(connection) {
		return connection.release();
	}
});


export default pool;