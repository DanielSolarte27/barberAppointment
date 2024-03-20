import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import { userModel } from "../repositories";
import { createCredential } from "./credentialService";

//* INTERFACES
interface createUserDto {
  name: string;
  email: string;
  birthdate: string;
  nDni: string;
  username: string;
  password: string;
}

export const getAllUsersService = async (): Promise<User[]> => {
  const allUsers: User[] = await userModel.find({
    relations: { appointments: true },
  });
  return allUsers;
};

export const getUserByIdService = async (id: number): Promise<User> => {
  const foundUser: User | null = await userModel.findOne({
    where: { id },
    relations: { appointments: true },
  });
  if (!foundUser) throw Error("No se encontro el usuario");
  return foundUser;
};

export const createUserService = async (
  createUserDto: createUserDto
): Promise<User> => {
  const newUser: User = userModel.create(createUserDto);
  const newCredential: Credential = await createCredential({
    username: createUserDto.username,
    password: createUserDto.password,
  });
  await userModel.save(newUser);
  newUser.credential = newCredential;
  await userModel.save(newUser);

  return newUser;
};

export const findUserByCredentialId = async (
  credentialId: number
): Promise<User | null> => {
  const foundUser: User | null = await userModel.findOneBy({
    credential: { id: credentialId },
  });
  return foundUser;
};
