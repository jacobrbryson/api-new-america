const db = require("../helpers/db");
const mysql = require("mysql2");

/* *************************/
/* Hopefully not too messy */
/* universal db requests   */
/* based on RESTful routes */
/* *************************/
exports.get = async function(object, params, returnObject = false){
	id = 0;
	return new Promise((resolve, reject) => {
		let countSelect = `SELECT COUNT(id) as count FROM v_${object.key}`;
		let select = `SELECT ${object.columns.join(", ")} FROM v_${object.key}`;
		let where = ``;
		for(let [key, value] of Object.entries(params)){
			if(!object.columns.includes(key)) continue; //skip if the key is not a column
			where += ` ${where.length ? `AND` : `WHERE`} ${key} = ${mysql.escape(value)}`;
		}

		let limit = ` LIMIT ${returnObject ? `1` : `100`}`;

		let sql = !returnObject ? countSelect + where + `; ` : ``;
		sql += select + where + limit;

		db.query(sql, [id], (error, results) => {
			if(error) return reject(error);

			if(returnObject && !results.length) resolve(null);
			
			if(returnObject){
				resolve(new object.model(results[0]));
			}else{
				resolve({
					count: results[0][0].count,
					data: results[1].map((result) => new object.model(result))
				});
			}
		})
	});
}
