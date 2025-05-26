import { Request, Response } from "express";
import {
	createPlayerAssets,
	createTerrainAssets,
	getPlayerAssets,
	getTerrainAssets,
} from "../../../services/location/asset";

export const postTerrainAssets = async (req: Request, res: Response) => {
	const locationId = req.params.identifier;
	const assets = req.body;

	//Check that all items are in the player's inventory
	//Check for items outside the terrain

	try {
		await createTerrainAssets(locationId, assets);
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

export const getTerrainAssetsById = async (
	req: Request,
	res: Response
) => {
	const locationId = req.params.identifier;

	try {
		const assets = await getTerrainAssets(locationId);
		if (assets) {
			return res.json(assets);
		} else {
			return res
				.status(404)
				.json({ message: "Terrain assets not found." });
		}
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Failed to fetch terrain assets." });
	}
};

export const getPlayerAssetsById = async (req: Request, res: Response) => {
	const locationId = req.params.identifier;

	try {
		const assets = await getPlayerAssets(locationId);
		if (assets) {
			return res.json(assets);
		} else {
			return res.status(404).json({ message: "Player assets not found." });
		}
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Failed to fetch player assets." });
	}
};
