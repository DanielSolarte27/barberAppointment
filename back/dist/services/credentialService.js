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
exports.validarCredenciales = exports.createCredential = void 0;
const repositories_1 = require("../repositories");
const createCredential = (newCredentialDto) => __awaiter(void 0, void 0, void 0, function* () {
    const newCredential = repositories_1.credentialModel.create(newCredentialDto);
    yield repositories_1.credentialModel.save(newCredential);
    return newCredential;
});
exports.createCredential = createCredential;
const validarCredenciales = (validateCredentialDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = validateCredentialDto;
    const foundCredential = yield repositories_1.credentialModel.findOneBy({ username });
    if (!foundCredential)
        throw Error("Usuario no encontrado");
    if (password !== foundCredential.password)
        throw Error("Contraseña incorrecta");
    return foundCredential;
});
exports.validarCredenciales = validarCredenciales;
