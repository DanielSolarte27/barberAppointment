import { Router } from "express";
import { cancel, getAllAppointments, getAppointmentById, schedule } from "../controllers/appointmentsController";
const appointmentsRouter = Router();

appointmentsRouter.get('/', getAllAppointments);
appointmentsRouter.get('/:appId', getAppointmentById);
appointmentsRouter.post('/schedule', schedule);
appointmentsRouter.put('/cancel/:appId', cancel);

export default appointmentsRouter;
