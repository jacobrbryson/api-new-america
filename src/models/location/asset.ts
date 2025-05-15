import mongoose from "../../db/mongo";

const LocationAssetSchema = new mongoose.Schema({
	locationUuid: { type: String, required: true, unique: true },
	assets: { type: mongoose.Schema.Types.Mixed, required: true },
});

export const LocationAsset = mongoose.model(
	"LocationAsset",
	LocationAssetSchema
);

const PlayerAssetSchema = new mongoose.Schema({
	locationUuid: { type: String, required: true, unique: true },
	assets: { type: mongoose.Schema.Types.Mixed, required: true },
});

export const PlayerAsset = mongoose.model(
	"PlayerAsset",
	PlayerAssetSchema
);
