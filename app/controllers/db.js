const db = require("../helpers/db");
const mysql = require("mysql2");
const objects = require("../config/objects");

/* *************************/
/* Hopefully not too messy */
/* universal db requests   */
/* based on RESTful routes */
/* *************************/
exports.get = async function(object, params, returnObject = false){
	return new Promise((resolve, reject) => {
		let countSelect = `SELECT COUNT(*) as count FROM v_${object.key}`;
		let select = `SELECT ${object.columns.join(", ")} FROM v_${object.key}`;
		let where = ``;
		for(let [key, value] of Object.entries(params)){
			if(!object.columns.includes(key)) continue; //skip if the key is not a column
			where += ` ${where.length ? `AND` : `WHERE`} ${key} = ${mysql.escape(value)}`;
		}

		let limit = ` LIMIT ${returnObject ? `1` : `100`}`;

		let sql = !returnObject ? countSelect + where + `; ` : ``;
		sql += select + where + limit;
		
		db.query(sql, [], (error, results) => {
			if(error) return reject(error);

			if(returnObject && !results.length) return resolve({});
			
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

exports.post = async function(object, body){
	return new Promise((resolve, reject) => {
		db.query(`CALL sp_create_update_${object.key}(?,?,?);
		`, [body.tutorialId, body.userId, body.timeMs], (error, results) => {
			if(error) return reject(error);

			resolve(new object.model(results[0][0]));
		});
	});
	
}

//TODO - move this somewhere smarter
exports.addUser = async function(user){
  const userObject = objects.find((object) => object.key == 'users');

  return new Promise((resolve, reject) => {
    db.query(`CALL sp_create_update_user(?,?,?)`, [null, null, user.personaname], (error, results) => {
      if(error) return reject(error);
      resolve(new userObject.model(results[0][0]));
    });
  });
}