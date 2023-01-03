module.exports = {
	key: 'tutorials',
	columns: ['id', 'name', 'description'],
	model: function(tutorial){
		this.id = tutorial.id;
		this.name = tutorial.name;
		this.description = tutorial.description;
	}
};