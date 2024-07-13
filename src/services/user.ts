import db from "../helpers/db";
import UserModel from "../models/user";

class User {
	async login(user:UserModel):Promise<UserModel>{
		return new Promise((resolve, reject) => {
			db.query(`CALL sp_login(?,?)`, [user.steamId, user.displayName], (error, results:any) => {
				if(error) return reject(error);
				resolve(new UserModel(results[0][0]));
			});
		});
	}
}

export default new User()