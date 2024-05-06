export default class CustomError {
  static createError(req, { message, cause, code }) {
    const error = new Error(message, { cause });
    error.code = code;
    //lo nuevo
    req.logger.error(
      ` Error!!! ${message + ": " + cause}, ${req.method} en ${
        req.url
      } - ${new Date().toLocaleDateString()}`
    );
    throw error;
  }
}
