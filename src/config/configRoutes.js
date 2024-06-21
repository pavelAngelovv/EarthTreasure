// TODO import routers

const { homeRouter } = require("../controllers/homeController");

function configRoutes(app) {
    app.use(homeRouter);
    // TODO register routers
}

module.exports =  { configRoutes };