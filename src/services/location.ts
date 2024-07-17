import db from "../helpers/db";
import LocationModel from "../models/location";
import { Result } from "../types/query";
import { escape } from "mysql2";

class Location {
	async list(params:any):Promise<Result>{
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

	async get(identifier:string):Promise<LocationModel>{
		//Identifier can either be uuid or coordinates
		const where = this.whereByIdentifier(identifier);

		return new Promise((resolve, reject) => {
			db.query(`
				SELECT * FROM v_locations ${where} LIMIT 1`, [], (error, results:any) => {
				if(error) return reject(error);
				resolve( new LocationModel(results[0]))
			});
		});
	}

	private whereByIdentifier(identifier:string){
		//TODO: Needs to throw error correctly if invalid identifier
		//TODO: Consider moving to switch/case for readability
		const regex = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$");
		const isUuid = regex.test(identifier);
	
		return isUuid ? ` WHERE uuid = ${escape(identifier)}` : ` WHERE coord_x = ${escape(identifier.split("-")[0])} AND coord_y = ${escape(identifier.split("-")[1])}`;
	}
}

export default new Location()