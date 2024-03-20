import { Router } from "express";
import { getAllUsers, getUserById, login, register } from "../controllers/userController";
const usersRouter = Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/register", register);
usersRouter.post("/login", login)

export default usersRouter;