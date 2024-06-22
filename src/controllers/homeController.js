const { Router } = require("express");
const { getRecent } = require("../services/stoneService");

// TODO replace with real router according to exam description

const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    console.log(req.user);
    const stones = await getRecent();

    res.render('home', { stones });
});

module.exports = { homeRouter };