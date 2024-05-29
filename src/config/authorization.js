//midlleware para autorizar y delimitar el acceso en los endpoints
export const authorization = (roles) => {
  return async (req, res, next) => {
    if (!req.session.email)
      return res.status(401).send({ status: "error", msg: "Unauthorized" });
    const permitted = roles.find((role) => role === req.session.role);
    if (!permitted)
      return res.status(403).send({ status: "error", msg: "No permissions" });
    next();
  };
};
