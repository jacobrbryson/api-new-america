module.exports = {
	key: 'tutorial_users',
	columns: ['id', 'created', 'updated', 'timeMs', 'tutorialId', 'userId', 'tutorialName', 'tutorialDescription', 'userSteamId', 'userPersonaname'],
	model: function(tutorialUser){
		this.id = tutorialUser.id,
		this.created = tutorialUser.created,
		this.updated = tutorialUser.updated,
		this.timeMs = tutorialUser.timeMs,
		this.tutorial = {
			id: tutorialUser.tutorialId,
			name: tutorialUser.tutorialName,
			description: tutorialUser.tutorialDescription,
		}
		this.user = {
			id: tutorialUser.userId,
			steamId: tutorialUser.userSteamId,
			personaname: tutorialUser.userPersonaname
		}
	}
};