const { Router } = require("express");

// TODO replace with real router according to exam description

const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    console.log(req.user);
    const minerals = [1, 2, 3]

    res.render('home', { minerals });
});

module.exports = { homeRouter };