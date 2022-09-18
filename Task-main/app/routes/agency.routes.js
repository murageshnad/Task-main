const { authJwt } = require("../middlewares");
const controller = require("../controllers/agency.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/create",
    [authJwt.verifyToken],
    controller.createAgencyAndClient
  );
  app.put("/api/update", [authJwt.verifyToken], controller.updateClient);
  app.get(
    "/api/getDetails",
    [authJwt.verifyToken],
    controller.getClientDetails
  );
};
