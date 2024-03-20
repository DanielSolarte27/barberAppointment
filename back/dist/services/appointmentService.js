"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentService = exports.scheduleAppointmentService = exports.getAppointmentByIdService = exports.getAllAppointmentsService = void 0;
const repositories_1 = require("../repositories");
const getAllAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allAppointments = yield repositories_1.appointmentModel.find();
    return allAppointments;
});
exports.getAllAppointmentsService = getAllAppointmentsService;
const getAppointmentByIdService = (appId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAppointment = yield repositories_1.appointmentModel.findOneBy({
        id: appId,
    });
    if (!foundAppointment)
        throw Error("Turno no encontrado");
    return foundAppointment;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const scheduleAppointmentService = (scheduleTurnDto) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointment = repositories_1.appointmentModel.create(scheduleTurnDto);
    yield repositories_1.appointmentModel.save(newAppointment);
    const user = yield repositories_1.userModel.findOneBy({
        id: scheduleTurnDto.userId,
    });
    if (!user)
        throw Error('Usuario no encontrado');
    newAppointment.user = user;
    yield repositories_1.appointmentModel.save(newAppointment);
    return newAppointment;
});
exports.scheduleAppointmentService = scheduleAppointmentService;
const cancelAppointmentService = (appId) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentCancel = yield repositories_1.appointmentModel.findOneBy({
        id: appId,
    });
    if (!appointmentCancel)
        throw Error("Appointment no encontrado");
    appointmentCancel.status = "cancelled";
    yield repositories_1.appointmentModel.save(appointmentCancel);
});
exports.cancelAppointmentService = cancelAppointmentService;
