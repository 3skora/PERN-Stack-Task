import { Router } from "express";
import MatchController from "../controllers/match.controller";

const path = "/match";
const router = Router();

router.get(`${path}`, MatchController.getMatch);
router.get(`${path}/:id`, MatchController.getMatchById);
router.post(`${path}`, MatchController.createMatch);
router.put(`${path}/:id`, MatchController.updateMatch);
router.delete(`${path}/:id`, MatchController.deleteMatch);

export default { router, path };
