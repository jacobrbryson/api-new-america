module.exports = {
	key: 'tutorial_users',
	columns: ['created', 'updated', 'timeMs', 'tutorialId', 'userId', 'tutorialName', 'tutorialDescription', 'userSteamId', 'userPersonaname', 'userRank'],
	model: function(tutorialUser){
		this.created = tutorialUser.created,
		this.updated = tutorialUser.updated,
		this.timeMs = tutorialUser.timeMs,
		this.rank = tutorialUser.userRank,
		this.tutorial = {
			id: tutorialUser.tutorialId,
			name: tutorialUser.tutorialName,
			description: tutorialUser.tutorialDescription,
		}
		this.user = {
			id: tutorialUser.userId,
			steamId: tutorialUser.userSteamId,
			personaname: tutorialUser.userPersonaname,
		}
	}
};