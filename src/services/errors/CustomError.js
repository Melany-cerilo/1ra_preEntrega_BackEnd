export default class CustomError {
  static createError({ message, cause, code }) {
    const error = new Error(message, { cause });
    error.code = code;

    throw error;
  }
}
