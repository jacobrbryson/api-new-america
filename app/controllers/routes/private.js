const db = require("../db");
const objects = require("../../config/objects");

/* *************************/
/* Hopefully not too messy */
/* universal db requests   */
/* based on RESTful routes */
/* *************************/
module.exports = async function (req, res) {
	const objectKeys = Object.entries(req.params)
		.filter((param) => param[0].includes("Key"))
		.map((param) => i = param[1]);
	const objectIds = Object.entries(req.params)
		.filter((param) => param[0].includes("Id"))
		.map((param) => i = param[1]);

	let tableName = null;
	
	for(let key of objectKeys){
		tableName = tableName ? tableName.substring(0, tableName.length - 1) : "";
		tableName += (tableName.length ? "_" : "") + key;
	}

	const table = objects.find((object) => object.key == tableName);
		
	if(!table) return res.status(404).json({ message: "Invalid request - resource not found"});

	const params = addUriParamsToQueryParams(req.query, objectKeys, objectIds);

	//If there's an equal number of keys to ids then return an object instead of an array
	const returnObject = objectKeys.length == objectIds.length;

	let response = await db.get(table, params, returnObject).catch((error) => {
		console.error(error);
	});

	if(!response) return res.status(500).json({message: "Something went wrong"});

	res.json(response);
}

function addUriParamsToQueryParams(queryParams, keys, ids){
	for(i = 0; i < ids.length; i++){
		queryParams[keys[i].substring(0, keys[i].length - 1) + "Id"] = ids[i];
	}

	return queryParams;
}