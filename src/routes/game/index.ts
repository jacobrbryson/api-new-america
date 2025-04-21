import Router from "express";

import { auth } from "../../helpers/auth";

import HeightmapRoutes from "./heightmap";
import LocationRoutes from "./location";
import UserRoutes from "./user";

const router = Router();

router.use(auth);

router.use("/heightmaps", HeightmapRoutes);
router.use("/locations", LocationRoutes);
router.use("/users", UserRoutes);

export default router;
