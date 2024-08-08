import { Router } from "express";
import { getURL } from "../controllers/url";

const router = Router();

router.get("/", getURL);

export default router;
