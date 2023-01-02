const mysql = require("mysql2");
const config = require("../config/config");
const objects = require("../config/objects");

let pool = mysql.createPool(config.conn);

pool.getConnection((err, connection) => {
	if(err) console.error(err);

	if(connection) {
		checkSchema(connection);
		return connection.release();
	}
});

function checkSchema(){
	//Literally just loop over each object and make sure there's a matching db view
	for(let object of objects){
		pool.query(`SELECT ${object.columns.join(", ")} FROM v_${object.key} LIMIT 1`, [], (error, results) => {
			if(error) throw(error);
		});
	}
	
	return;
}

module.exports = pool;