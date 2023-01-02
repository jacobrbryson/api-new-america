module.exports = {
	key: 'users',
	columns: ['id', 'steamId', 'personaname'],
	model: function(user){
		this.id = user.id;
		this.steamId = user.steamId;
		this.personaname = user.personaname;
	}
};