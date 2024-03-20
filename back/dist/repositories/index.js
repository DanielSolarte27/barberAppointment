"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentModel = exports.credentialModel = exports.userModel = void 0;
const data_source_1 = require("../config/data-source");
const Appointment_1 = require("../entities/Appointment");
const Credential_1 = require("../entities/Credential");
const User_1 = require("../entities/User");
exports.userModel = data_source_1.AppDataSource.getRepository(User_1.User);
exports.credentialModel = data_source_1.AppDataSource.getRepository(Credential_1.Credential);
exports.appointmentModel = data_source_1.AppDataSource.getRepository(Appointment_1.Appointment);
