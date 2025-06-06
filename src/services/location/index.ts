import { escape } from "mysql2";
import { getMysqlPool } from "../../db/mysql";
import QueryHelper from "../../helpers/query";
import LocationModel from "../../models/location";
import { Result } from "../../types/query";

class Location {
	async list(params: any): Promise<Result> {
		const limit = QueryHelper.limit(params.limit);
		const offset = QueryHelper.offset(params.offset);
		const where = this.buildWhere(params);
		const orderBy = ` ORDER BY id DESC`;
		const limitOffset = ` LIMIT ${limit} OFFSET ${offset}`;

		return new Promise((resolve, reject) => {
			const sql = `
				SELECT count(*) as count 
				FROM v_locations${where}; 
				SELECT * 
				FROM v_locations${where}${orderBy}${limitOffset};`;

			const db = getMysqlPool();
			db.query(sql, [], (error, results: any) => {
				if (error) return reject(error);
				resolve({
					count: results[0][0].count,
					data: results[1].map(
						(result: LocationModel) => new LocationModel(result)
					),
				});
			});
		});
	}

	async get(identifier: string): Promise<LocationModel> {
		//Identifier can either be uuid or coordinates
		const where = this.whereByIdentifier(identifier);

		return new Promise((resolve, reject) => {
			const db = getMysqlPool();
			db.query(
				`
				SELECT * FROM v_locations ${where} LIMIT 1`,
				[],
				(error, results: any) => {
					if (error) return reject(error);
					resolve(new LocationModel(results[0]));
				}
			);
		});
	}

	private whereByIdentifier(identifier: string) {
		//TODO: Needs to throw error correctly if invalid identifier
		//TODO: Consider moving to switch/case for readability
		const regex = new RegExp(
			"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
		);
		const isUuid = regex.test(identifier);

		return isUuid
			? ` WHERE uuid = ${escape(identifier)}`
			: ` WHERE coord_x = ${escape(
					identifier.split("-")[0]
			  )} AND coord_y = ${escape(identifier.split("-")[1])}`;
	}

	private buildWhere(params: any) {
		let where = ` WHERE id IS NOT NULL`;
		if (params.owner_user_uuid)
			where += ` AND owner_user_uuid = ${escape(params.owner_user_uuid)}`;
		if (params.is_primary) {
			where += ` AND is_primary = true`;
		}

		return where;
	}
}

export default new Location();
