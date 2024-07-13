import Location from './location';

export default class User {
	id?:number;
	created?:Date;
	updated?:Date;
	lastLogin?:Date;
	steamId?:number;
	primaryLocation?:Location;
	displayName?:string;
	level?:number;
	credits?:number;
	xp?:number

	constructor(user:any){
		this.id = user.id;
		this.created = user.created;
		this.updated = user.updated;
		this.lastLogin = user.last_login;
		this.steamId = user.steam_id;
		this.primaryLocation = {
			id: user.primary_location_id
		}
		this.displayName = user.display_name;
		this.level = user.level;
		this.credits = user.credits;
		this.xp = user.xp;
	}
}