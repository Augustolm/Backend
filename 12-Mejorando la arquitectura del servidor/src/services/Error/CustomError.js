export default class CustomError {
  static crearError({ name = "Error", cause, mensaje, codigo = 1 }) {
    const error = new Error(mensaje, { cause });
    error.name = name;
    error.codigo = codigo;
    throw error;
  }
}
