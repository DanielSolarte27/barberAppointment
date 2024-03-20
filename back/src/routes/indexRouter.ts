import { Router } from "express";
import usersRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouters";
const indexRouter = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/appointments", appointmentsRouter);

export default indexRouter;
