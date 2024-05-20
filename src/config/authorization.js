//midlleware para autorizar y delimitar el acceso en los endpoints
export const authorization = (roles) => {
  return async (req, res, next) => {
    if (!req.session.email)
      return res.status(401).send({ error: "Unauthorized" });
    const permitted = roles.find((role) => role === req.session.role);
    if (!permitted) return res.status(403).send({ error: "No permissions" });
    next();
  };
};
