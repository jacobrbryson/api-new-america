import Router from 'express';
import { get } from '../../controllers/game/location';
import { auth } from "../../helpers/auth";

const router = Router();

router.use(auth);

router.get("/locations", get);

export default router;