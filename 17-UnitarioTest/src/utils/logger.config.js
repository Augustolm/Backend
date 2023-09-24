import winston from "winston";

export const devLogger = winston.createLogger({
  transports: [new winston.transports.Console({ level: "http" })],
});

export const prodLogger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "./error/errors.log",
      level: "warn",
    }),
    new winston.transports.Console({ level: "http" }),
  ],
});

export const addLogger = (req, res, next) => {
  req.logger = process.env.ENVIROMENT === "production" ? devLogger : prodLogger;

  next();
};
