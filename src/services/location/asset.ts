import { LocationAsset, PlayerAsset } from "../../models/location/asset";

// Save or update location assets
export const createLocationAssets = async (
	locationUuid: string,
	assets: any
) => {
	try {
		await LocationAsset.findOneAndUpdate(
			{ locationUuid },
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
export const getLocationAssets = async (locationUuid: string) => {
	try {
		const doc = await LocationAsset.findOne({ locationUuid });
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
