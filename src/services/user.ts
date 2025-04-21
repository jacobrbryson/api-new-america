import { getMysqlPool } from "../db/mysql";
import UserModel from "../models/user";

class User {
	async login(user: UserModel): Promise<UserModel> {
		return new Promise((resolve, reject) => {
			const db = getMysqlPool();
			db.query(
				`CALL sp_login(?,?)`,
				[user.steamId, user.displayName],
				(error, results: any) => {
					if (error) return reject(error);
					resolve(new UserModel(results[0][0]));
				}
			);
		});
	}

	async update(uuid: string, user: UserModel): Promise<UserModel> {
		return new Promise((resolve, reject) => {
			const db = getMysqlPool();
			db.query(
				`CALL sp_update_user(?,?,?,?,?,?,?,?)`,
				[
					uuid,
					user.displayName,
					user.level,
					user.credits,
					user.xp,
					user.avatarEnum,
					user.corpEnum,
					user.primaryLocation?.id,
				],
				(error, results: any) => {
					if (error) return reject(error);
					user = new UserModel(results[0][0]);
					resolve(user);
				}
			);
		});
	}

	async get(uuid: string): Promise<UserModel> {
		return new Promise((resolve, reject) => {
			const db = getMysqlPool();
			db.query(
				`SELECT * FROM v_users WHERE uuid = ? LIMIT 1`,
				[uuid],
				(error, results: any) => {
					if (error) return reject(error);
					resolve(new UserModel(results[0]));
				}
			);
		});
	}
}

export default new User();
