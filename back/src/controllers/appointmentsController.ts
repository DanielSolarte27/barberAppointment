import { Request, Response } from "express";
import { cancelAppointmentService, getAllAppointmentsService, getAppointmentByIdService, scheduleAppointmentService } from "../services/appointmentService";
import { Appointment } from "../entities/Appointment";

//* GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.
export const getAllAppointments = async (req: Request, res: Response) => {
  const appointments: Appointment[] = await getAllAppointmentsService();
  res.status(200).json(appointments);
};

//* GET /appointments => Obtener el detalle de un turno específico.
export const getAppointmentById = async (req: Request, res: Response) => {
  const { appId } = req.params;
  try {
    const appointment = await getAppointmentByIdService(Number(appId));
    res.status(200).json(appointment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

//* POST /appointments/schedule => Agendar un nuevo turno.
export const schedule = async (req: Request, res: Response) => {
  const { date, time, userId, description } = req.body;
  try {
    const createAppointment: Appointment = await scheduleAppointmentService({
      date,
      time,
      userId,
      description,
    });
    res.status(201).json(createAppointment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

//* PUT /appointments/cancel => Cambiar el estatus de un turno a “cancelled”.
export const cancel = async (req: Request, res: Response) => {
  const { appId } = req.params;
  try {
    await cancelAppointmentService(Number(appId));
    res.status(200).json({ message: `El turno con ID ${appId} ha sido cancelado`});
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
