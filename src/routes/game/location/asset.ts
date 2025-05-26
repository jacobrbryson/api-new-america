import express from "express";
import {
	getPlayerAssetsById,
	getTerrainAssetsById,
	postPlayerAssets,
	postTerrainAssets,
} from "../../../controllers/game/location/asset";

const router = express.Router({ mergeParams: true });

router.post("/terrain", postTerrainAssets);
router.post("/player", postPlayerAssets);
router.get("/terrain", getTerrainAssetsById);
router.get("/player", getPlayerAssetsById);

export default router;
