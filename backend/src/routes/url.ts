import { Router } from "express";
import { addURL, getURL, redirect } from "../controllers/url";

const router = Router();

router.get("/", getURL);
router.post("/", addURL);
router.get("/hit/:id", redirect);

export default router;
