import Router from 'express';
import { list, get } from '../../controllers/game/location';
import { auth } from "../../helpers/auth";

const router = Router();

router.use(auth);

router.get("/locations", list);
router.get("/locations/:identifier", get);

export default router;