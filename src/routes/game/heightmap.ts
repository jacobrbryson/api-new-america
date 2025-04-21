import Router from "express";
import { generate } from "../../controllers/game/heightmap";

const router = Router();

router.get("/", generate);

export default router;
