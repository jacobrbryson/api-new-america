import User from "../user";

export default class Location {
	id?: number;
	uuid?: string;
	created?: Date;
	updated?: Date;
	owner?: User | null;
	seed?: number;
	isPrimary?: boolean;
	coordX?: number;
	coordY?: number;
	typeEnum?: string;
	name?: string;
	age?: number;
	level?: number;
	income?: number;
	status?: string;

	constructor(location: any) {
		this.uuid = location.uuid;
		this.created = location.created;
		this.updated = location.updated;
		this.owner = location.owner_user_id
			? {
					uuid: location.owner_user_uuid,
					steamId: location.owner_user_steam_id,
					displayName: location.owner_user_display_name,
					level: location.owner_user_level,
			  }
			: null;
		this.isPrimary = location.is_primary;
		this.seed = location.seed;
		this.coordX = location.coord_x;
		this.coordY = location.coord_y;
		this.typeEnum = location.type_enum;
		this.name = location.name;
		this.age = location.age;
		this.level = location.level;
		this.income = location.income;
		this.status = location.status;
	}
}
