import { Router } from "express";
import UserController from "../controllers/user.controller";

const path = "/users";
const router = Router();

router.get(`${path}`, UserController.getUsers);
router.get(`${path}/:id`, UserController.getUserById);
router.post(`${path}`, UserController.createUser);
router.put(`${path}/:id`, UserController.updateUser);
router.delete(`${path}/:id`, UserController.deleteUser);

export default { router, path };
