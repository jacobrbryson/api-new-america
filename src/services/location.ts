import db from "../helpers/db";
import LocationModel from "../models/location";
import { Result } from "../types/query";

class Location {
	async get(params:any):Promise<Result>{
		return new Promise((resolve, reject) => {
			db.query(`
				SELECT count(*) as count FROM v_locations; 
				SELECT * FROM v_locations`, [], (error, results:any) => {
				if(error) return reject(error);
				resolve({
					count: results[0][0].count,
					data: results[1].map((result:LocationModel) => new LocationModel(result))
				});
			});
		});
	}
}

export default new Location()