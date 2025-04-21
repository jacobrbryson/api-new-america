import Router from "express";
import { setAvatar, setCorp } from "../../controllers/game/user";

const router = Router();

router.post("/:uuid/avatar", setAvatar);
router.post("/:uuid/corp", setCorp);

export default router;
