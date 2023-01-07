const config = require("../config/config");
const jwt = require("jsonwebtoken");

exports.auth = async function(req, res, next){
	if(req.path === "/" || req.path === "/login") return next();

	if(!req.headers.authorization || req.headers.authorization.indexOf("Bearer ") === -1){
		return res.status(401).json({message: "Missing or invalid authorization header"});
	}

	const token = req.headers.authorization.split(" ")[1];

	try{
		const decoded = decodeToken(token);
		
		if(!decoded?.id){
			return res.status(401).json({message: "Invalid token"});
		}

		req.user = decoded;

		next();
	}catch(error){
		return res.status(401).json({ message: "Failed to decode authorization token"});
	}
}

exports.encodeToken = function (tokenData = {}){
	return encodeToken(tokenData);
}

function encodeToken(tokenData = {}){
	const token = jwt.sign(
		{
			data: tokenData
		},
		config.jwt.key,
		{
			expiresIn: config.jwt.expiresIn
		}
	)

	return token;
}

exports.decodeToken = function (token){
	return decodeToken(token);
}

function decodeToken(token){
	try{
		const decoded = jwt.verify(token, config.jwt.key);
		return decoded?.data ? decoded.data : null;
	}catch(error){
		console.error(error);
		return null;
	}
}