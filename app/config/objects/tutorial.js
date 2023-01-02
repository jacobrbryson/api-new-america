module.exports = {
	key: 'tutorials',
	columns: ['tutorialId', 'name', 'description'],
	model: function(tutorial){
		this.id = tutorial.tutorialId;
		this.name = tutorial.name;
		this.description = tutorial.description;
	}
};