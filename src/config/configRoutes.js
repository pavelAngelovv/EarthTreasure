// TODO import routers

const { homeRouter } = require("../controllers/homeController");
const { userRouter } = require("../controllers/userController");

function configRoutes(app) {
    app.use(homeRouter);
    app.use(userRouter);
    // TODO register routers
}

module.exports =  { configRoutes };