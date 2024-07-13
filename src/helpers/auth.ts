import config from "../config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
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

export const encodeToken = (tokenData = {}) => {
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

export const decodeToken = (token:string) => {
	try{
		const decoded = jwt.verify(token, config.jwt.key);
		return typeof decoded !== 'string' ? decoded.data : null;
	}catch(error){
		console.error(error);
		return null;
	}
}
