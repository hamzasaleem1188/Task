const routes = require("express").Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../controllers/authToken");

routes.post("/SignUp", async (req, res, next) => {
  const user = await authController.SignUpUser(req.body);
  if (user.status === 0) {
    res.status(409).json(user);
  } else res.json(user);
  next();
});

routes.post("/Login", async (req, res, next) => {
  const user = await authController.LoginUser(req.body);
  if (user.status === 0) {
    res.status(409).json(user);
  } else res.json(user);
  next();
});

routes.get("/authorized", authMiddleware, (req, res) => {
  res.json({ message: "Authorized access", userId: req.userId });
});

routes.post("/verify-token", (req, res) => {
  res.json({ message: "Authorized access", user: req.user });
});
module.exports = routes;
