import Router from "express";
import { get, list } from "../../../controllers/game/location";
import AssetRoutes from "./asset";

const router = Router();

router.get("/", list);
router.get("/:identifier", get);

router.use("/:identifier/assets", AssetRoutes);

export default router;
