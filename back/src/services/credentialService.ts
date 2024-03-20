import { Credential } from "../entities/Credential";
import { credentialModel } from "../repositories";

//* INTERFACES

interface newCredentialDto {
  username: string;
  password: string;
}

interface validateCredentialDto {
  username: string;
  password: string;
}

export const createCredential = async (newCredentialDto: newCredentialDto): Promise<Credential> => {
  const newCredential: Credential = credentialModel.create(newCredentialDto);
  await credentialModel.save(newCredential);
  return newCredential;
}

export const validarCredenciales = async (validateCredentialDto: validateCredentialDto): Promise<Credential> => {
    const { username, password } = validateCredentialDto;
    const foundCredential: Credential | null = await credentialModel.findOneBy({ username });
    if(!foundCredential) throw Error("Usuario no encontrado");
    if(password !== foundCredential.password) throw Error("Contraseña incorrecta");
    return foundCredential; 
}
