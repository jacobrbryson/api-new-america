import express from "express";
import {
	getLocationAssetsById,
	getPlayerAssetsById,
	postLocationAssets,
	postPlayerAssets,
} from "../../../controllers/game/location/asset";

const router = express.Router({ mergeParams: true });

router.post("/location", postLocationAssets);
router.post("/player", postPlayerAssets);
router.get("/location", getLocationAssetsById);
router.get("/player", getPlayerAssetsById);

export default router;
