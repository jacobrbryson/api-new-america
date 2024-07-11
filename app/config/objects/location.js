module.exports = {
	key: 'locations',
	columns: ['id', 'owner_user_id', 'environment'],
	model: function(location){
		this.id = location.id;
		this.owner_user_id = location.owner_user_id;
		this.environment = location.environment;
	}
};