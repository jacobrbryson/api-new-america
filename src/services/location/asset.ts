import { PlayerAsset, TerrainAsset } from "../../models/location/asset";

// Save or update location assets
export const createTerrainAssets = async (
	locationUuid: string,
	assets: any
) => {
	try {
		await TerrainAsset.findOneAndUpdate(
			{ locationUuid },
			{ assets },
			{ upsert: true, new: true }
		);
	} catch (err) {
		console.error("Error creating terrain assets:", err);
		throw err;
	}
};

// Save or update player assets
export const createPlayerAssets = async (
	locationUuid: string,
	assets: any
) => {
	try {
		await PlayerAsset.findOneAndUpdate(
			{ locationUuid },
			{ assets },
			{ upsert: true, new: true }
		);
	} catch (err) {
		console.error("Error creating player assets:", err);
		throw err;
	}
};

// Get location assets by ID
export const getTerrainAssets = async (locationUuid: string) => {
	try {
		const doc = await TerrainAsset.findOne({ locationUuid });
		return doc?.assets || { children: [] };
	} catch (err) {
		console.error("Error fetching location assets:", err);
		throw err;
	}
};

// Get player assets by ID
export const getPlayerAssets = async (locationUuid: string) => {
	try {
		const doc = await PlayerAsset.findOne({ locationUuid });
		return doc?.assets || { children: [] };
	} catch (err) {
		console.error("Error fetching player assets:", err);
		throw err;
	}
};
