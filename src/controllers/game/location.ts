import { Request, Response } from "express";
import LocationService from '../../services/location';

export const list = async (req:Request, res:Response) => {
	const params = req.query;

	const result = await LocationService.list(params).catch((error) => {
		console.error(error);
	});

	if(!result) return res.status(500).json({message: "Failed to get locations"});

	res.json(result);
}

export const get = async (req:Request, res:Response) => {
	
	const identifier = req.params.identifier;
	const result = await LocationService.get(identifier).catch((error) => {
		console.error(error);
	});

	if(!result) return res.status(500).json({message: "Failed to get locations"});

	res.json(result);
}