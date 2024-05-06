import winston from "winston";
import config from "../config/config.js";
import { format } from "winston";
const { combine } = format;
const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warning: "yellow",
    info: "blue",
    debug: "white",
  },
};

const devLogger = winston.createLogger({
  // transports: [new winston.transports.Console({ level: "verbose" })],
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File(
      {
        filename: "./errors.log",
        //cambio warning x error
        level: "error",
      },
      winston.format.simple()
    ),
  ],
});

const prodLogger = winston.createLogger({
  // transports: [
  //   new winston.transports.Console({ level: "http" }),
  //   new winston.transports.File({
  //     filename: "./errors_entorno.log",
  //     level: "warn",
  //   }),
  // ],
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File(
      {
        filename: "./errors.log",
        //cambio warning x error
        level: "error",
      },
      winston.format.simple()
    ),
  ],
});
winston.addColors(customLevelOptions.colors);
const loggerObj = config.env === "production" ? prodLogger : devLogger;
Object.keys(customLevelOptions.levels).forEach((level) => {
  loggerObj[level] = function (message) {
    loggerObj.log({ level: level, message: message });
  };
});
export const logger = loggerObj;
export const addLogger = (req, res, next) => {
  //   const env = config.env || "development";
  req.logger = logger;
  next();
};
