import mongoose from "../../db/mongo";

const TerrainAssetSchema = new mongoose.Schema({
	locationUuid: { type: String, required: true, unique: true },
	assets: { type: mongoose.Schema.Types.Mixed, required: true },
});

export const TerrainAsset = mongoose.model(
	"TerrainAsset",
	TerrainAssetSchema
);

const PlayerAssetSchema = new mongoose.Schema({
	locationUuid: { type: String, required: true, unique: true },
	assets: { type: mongoose.Schema.Types.Mixed, required: true },
});

export const PlayerAsset = mongoose.model(
	"PlayerAsset",
	PlayerAssetSchema
);
