const { Router } = require("express");
const { getRecent, getAll, getById } = require("../services/stoneService");

// TODO replace with real router according to exam description

const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    console.log(req.user);
    const stones = await getRecent();

    res.render('home', { stones });
});

homeRouter.get('/catalog', async (req, res) => {
    const stones = await getAll();
    res.render('dashboard', { stones });
});

homeRouter.get('/catalog/:id', async (req, res) => {
    const stone = await getById(req.params.id);
    if (!stone) {
        res.render('404');
        return;
    }
    res.render('details', { stone });
});

module.exports = { homeRouter };