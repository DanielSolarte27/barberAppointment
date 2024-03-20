import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import { appointmentModel, userModel } from "../repositories";


//* Interface
interface ScheduleAppointmentDto {
  date: string;
  time: string;
  userId: number;
  description: string;
}

export const getAllAppointmentsService = async (): Promise<Appointment[]> => {
  const allAppointments: Appointment[] = await appointmentModel.find();
  return allAppointments;
};

export const getAppointmentByIdService = async (appId: number): Promise<Appointment> => {
    const foundAppointment: Appointment | null = await appointmentModel.findOneBy({
      id: appId,
    });
    if(!foundAppointment) throw Error("Turno no encontrado");
    return foundAppointment;
};

export const scheduleAppointmentService = async (scheduleTurnDto: ScheduleAppointmentDto): Promise<Appointment> => {
  const newAppointment: Appointment = appointmentModel.create(scheduleTurnDto);
  await appointmentModel.save(newAppointment);

  const user: User | null = await userModel.findOneBy({
    id: scheduleTurnDto.userId,
  });
  if(!user) throw Error('Usuario no encontrado');
  newAppointment.user = user;

  await appointmentModel.save(newAppointment);
  return newAppointment;
};

export const cancelAppointmentService = async (appId: number): Promise<void> => {
  const appointmentCancel: Appointment | null = await appointmentModel.findOneBy({
    id: appId,
  });
  if(!appointmentCancel) throw Error("Appointment no encontrado");
  appointmentCancel.status = "cancelled";
  await appointmentModel.save(appointmentCancel);
}
