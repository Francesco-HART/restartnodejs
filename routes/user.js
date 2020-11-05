const { requireAdmin } = require("./middlewares");
const User = require("../controllers/user");

module.exports = (app) => {
  app.get("/api/user", requireAdmin, User.getOne);
};
