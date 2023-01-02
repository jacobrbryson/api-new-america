module.exports = function (app) {
    const publicRouteController = require("../app/controllers/routes/public");
    app.route("/").get(publicRouteController);
    app.route("/login").post(publicRouteController);

    const privateRouteController = require("../app/controllers/routes/private")
    app.route("/:parentObjectKey").get(privateRouteController);
    app.route("/:parentObjectKey/:parentObjectId").get(privateRouteController);
    app.route("/:parentObjectKey/:parentObjectId/:childObjectKey").get(privateRouteController);
    app.route("/:parentObjectKey/:parentObjectId/:childObjectKey/:childObjectId").get(privateRouteController);
}