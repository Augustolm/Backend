import jwt from "jsonwebtoken";

export const PRIVATE_KEY = "contraseñaquefuncionacomounallave";

export const createToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "1h" });
  console.log("token creado", token);
  return token;
};

export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  console.log("token cookieExtrator", token);
  return token;
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new Error("No autenticado, no hay JWT");
    error.status = 401;
    next(error);
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, PRIVATE_KEY, (err, credenciales) => {
    if (err) {
      const error = new Error("Token no valido");
      error.status = 401;
      next(error);
    }

    req.user = credenciales.user;
    next();
  });
};
