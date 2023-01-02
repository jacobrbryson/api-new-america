module.exports = getObjects();

function getObjects(){
	let objects = [];

	require("fs").readdirSync("app/config/objects").forEach(function(file) {
		objects.push(require("./objects/" + file));
	});

	return objects
}