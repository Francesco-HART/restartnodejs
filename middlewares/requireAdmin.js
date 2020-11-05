module.exports = (req, res, next) => {
  if (!req.user && req.user.type === "user")
    return res
      .status(401)
      .send("Vous devez être administrateur pour accéder à cette ressource.");
  next();
};
