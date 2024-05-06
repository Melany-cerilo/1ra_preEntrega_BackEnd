import EErrors from "../services/errors/enums.js";

export default (error, req, res, next) => {
  req.logger.debug("Datos de error en middleware: " + error);

  switch (error.code) {
    case EErrors.PROPERTY_MISSING_ERROR:
    case EErrors.PRODUCT_CODE_DUPLICATE:
    case EErrors.DATABASE_ERROR:
    case EErrors.PRODUCT_NOT_FOUND:
    case EErrors.PROPERTY_MISSING_ERROR:
      res
        .status(400)
        .json({ status: "error", msg: error.message + ": " + error.cause });
      break;
    default:
      res.status(500).json({ status: "error", msg: "Error no contemplado" });
  }
};
