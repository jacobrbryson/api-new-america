import { Request, Response } from "express";
import {
	createLocationAssets,
	createPlayerAssets,
	getLocationAssets,
	getPlayerAssets,
} from "../../../services/location/asset";

export const postLocationAssets = async (req: Request, res: Response) => {
	const { locationId, assets } = req.body;

	if (!locationId || !assets) {
		return res
			.status(400)
			.json({ message: "locationId and assets are required." });
	}

	try {
		await createLocationAssets(locationId, assets);
		return res.status(201).json({ message: "Location assets saved." });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Failed to save location assets." });
	}
};

export const postPlayerAssets = async (req: Request, res: Response) => {
	const locationId = req.params.identifier;
	const assets = req.body;

	//Check that all items are in the player's inventory
	//Check for items outside the terrain

	try {
		await createPlayerAssets(locationId, assets);
		return res.status(201).json({ message: "Player assets saved." });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Failed to save player assets." });
	}
};

export const getLocationAssetsById = async (
	req: Request,
	res: Response
) => {
	const { locationId } = req.params;

	try {
		const assets = await getLocationAssets(locationId);
		if (assets) {
			return res.status(200).json(assets);
		} else {
			return res
				.status(404)
				.json({ message: "Location assets not found." });
		}
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Failed to fetch location assets." });
	}
};

export const getPlayerAssetsById = async (req: Request, res: Response) => {
	const { playerId } = req.params;

	try {
		const assets = await getPlayerAssets(playerId);
		if (assets) {
			return res.status(200).json(assets);
		} else {
			return res.status(404).json({ message: "Player assets not found." });
		}
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Failed to fetch player assets." });
	}
};
