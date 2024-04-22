//midlleware para autorizar y delimitar el acceso en los endpoints
export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.session.email)
      return res.status(401).send({ error: "Unauthorized" });
    if (
      (req.session.admin === true && role !== "admin") ||
      (req.session.admin === false && role === "admin")
    )
      return res.status(403).send({ error: "No permissions" });
    next();
  };
};
