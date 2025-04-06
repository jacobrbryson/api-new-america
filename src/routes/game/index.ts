import Router from "express";
import { auth } from "../../helpers/auth";
import { list, get } from "../../controllers/game/location";
import { setAvatar, setCorp } from "../../controllers/game/user";
import { generate } from "../../controllers/game/heightmap";

const router = Router();

router.use(auth);

router.get("/locations", list);
router.get("/locations/:identifier", get);
router.post("/users/:uuid/avatar", setAvatar);
router.post("/users/:uuid/corp", setCorp);
router.post("/heightmap",generate);

export default router;
