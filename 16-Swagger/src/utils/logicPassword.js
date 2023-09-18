import bcrypt from "bcrypt";

export const comparePasswords = async (password, hashedPassword) => {
  try {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    return passwordMatch;
  } catch (error) {
    console.error(error);
    throw new Error("Error al comparar contraseñas");
  }
};

export const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw new Error("Error al encriptar la contraseña");
  }
};
