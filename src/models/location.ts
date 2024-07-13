import User from './user';

export default class Location {
	id?:number;
	created?:Date;
	updated?:Date;
	owner?:User;
	seed?:number;
	isPrimary?:boolean;

	constructor(location:any){
		this.id = location.id;
		this.created = location.created;
		this.updated = location.updated;
		this.owner = {
			id: location.owner_user_id,
			steamId: location.owner_user_steam_id,
			displayName: location.owner_user_display_name,
			level: location.owner_user_level
		}
		this.isPrimary = location.is_primary;
		this.seed = location.seed;
	}
}