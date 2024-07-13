import { Request, Response } from "express";
import LocationService from '../../services/location';

export const get = async (req:Request, res:Response) => {
	const params = {
		...req.query,
		id:req.params.locationId
	};

	const result = await LocationService.get(params).catch((error) => {
		console.error(error);
	});

	if(!result) return res.status(500).json({message: "Failed to get locations"});

	res.json(result);
}
