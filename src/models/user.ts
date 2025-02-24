import Location from "./location";

export default class User {
	uuid?: string;
	created?: Date;
	updated?: Date;
	lastLogin?: Date;
	steamId?: number;
	primaryLocation?: Location;
	displayName?: string;
	level?: number;
	credits?: number;
	xp?: number;
	corpEnum?: string;
	avatarEnum?: string;

	constructor(user: any) {
		this.uuid = user.uuid;
		this.created = user.created;
		this.updated = user.updated;
		this.lastLogin = user.last_login;
		this.steamId = user.steam_id;
		this.primaryLocation = {
			id: user.primary_location_id,
		};
		this.displayName = user.display_name;
		this.level = user.level;
		this.credits = user.credits;
		this.xp = user.xp;
		this.corpEnum = user.corp_enum;
		this.avatarEnum = user.avatar_enum;
	}
}
