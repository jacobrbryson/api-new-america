import { LocationAsset, PlayerAsset } from "../../models/location/asset";

// Save or update location assets
export const createLocationAssets = async (
	locationId: string,
	assets: any
) => {
	try {
		await LocationAsset.findOneAndUpdate(
			{ locationId },
			{ assets },
			{ upsert: true, new: true }
		);
	} catch (err) {
		console.error("Error creating location assets:", err);
		throw err;
	}
};

// Save or update player assets
export const createPlayerAssets = async (
	playerId: string,
	assets: any
) => {
	try {
		await PlayerAsset.findOneAndUpdate(
			{ playerId },
			{ assets },
			{ upsert: true, new: true }
		);
	} catch (err) {
		console.error("Error creating player assets:", err);
		throw err;
	}
};

// Get location assets by ID
export const getLocationAssets = async (locationId: string) => {
	try {
		const doc = await LocationAsset.findOne({ locationId });
		return doc?.assets || null;
	} catch (err) {
		console.error("Error fetching location assets:", err);
		throw err;
	}
};

// Get player assets by ID
export const getPlayerAssets = async (playerId: string) => {
	try {
		const doc = await PlayerAsset.findOne({ playerId });
		return doc?.assets || null;
	} catch (err) {
		console.error("Error fetching player assets:", err);
		throw err;
	}
};
