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
exports.cancel = exports.schedule = exports.getAppointmentById = exports.getAllAppointments = void 0;
const appointmentService_1 = require("../services/appointmentService");
//* GET /appointments => Obtener el listado de todos los turnos de todos los usuarios.
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield (0, appointmentService_1.getAllAppointmentsService)();
    res.status(200).json(appointments);
});
exports.getAllAppointments = getAllAppointments;
//* GET /appointments => Obtener el detalle de un turno específico.
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appId } = req.params;
    try {
        const appointment = yield (0, appointmentService_1.getAppointmentByIdService)(Number(appId));
        res.status(200).json(appointment);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getAppointmentById = getAppointmentById;
//* POST /appointments/schedule => Agendar un nuevo turno.
const schedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, userId, description } = req.body;
    try {
        const createAppointment = yield (0, appointmentService_1.scheduleAppointmentService)({
            date,
            time,
            userId,
            description,
        });
        res.status(201).json(createAppointment);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.schedule = schedule;
//* PUT /appointments/cancel => Cambiar el estatus de un turno a “cancelled”.
const cancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appId } = req.params;
    try {
        yield (0, appointmentService_1.cancelAppointmentService)(Number(appId));
        res.status(200).json({ message: `El turno con ID ${appId} ha sido cancelado` });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.cancel = cancel;
