import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointment";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";

export const userModel = AppDataSource.getRepository(User);
export const credentialModel = AppDataSource.getRepository(Credential);
export const appointmentModel = AppDataSource.getRepository(Appointment);