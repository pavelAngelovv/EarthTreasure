const { Router } = require("express");
const { create, getById, update, deleteById } = require("../services/stoneService");
const { isUser } = require("../middlewares/guards");
const { body, validationResult } = require("express-validator");
const { parseError } = require("../util");

// TODO replace with real router according to exam description

const stoneRouter = Router();

stoneRouter.get('/create', isUser(), async (req, res) => {
    res.render('create');
});
stoneRouter.post('/create', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('Stone name needs to be at least 2 characters long'),
    body('category').trim().isLength({ min: 3 }).withMessage('Stone category needs to be at least 3 characters long'),
    body('color').trim().isLength({ min: 2 }).withMessage('Stone color needs to be at least 2 characters long'),
    body('formula').trim().isLength({ min: 3, max: 30 }).withMessage('Stone formula needs to be between 3 and 30 characters long'),
    body('location').trim().isLength({ min: 5, max: 15 }).withMessage('Stone location needs to be between 5 and 15 characters long'),
    body('description').trim().isLength({ min: 10 }).withMessage('Stone description needs to be at least 10 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('Stone image needs to be a valid url'),
    async (req, res) => {

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const authorId = req.user._id;
            console.log(req.user);

            await create(req.body, authorId);
            res.redirect('/catalog');

        } catch (err) {
            res.render('create', { data: req.body, errors: parseError(err).errors });
        }
    });

stoneRouter.get('/edit/:id', isUser(), async (req, res) => {
    const stone = await getById(req.params.id);
    
    if (!stone) {
        res.render('404');
        return;
    };

    const isOwner = req.user._id == stone.owner.toString();

    if (!isOwner) {
        res.redirect('/login')
        return;
    }
    res.render('edit', { data: stone });
});
stoneRouter.post('/edit/:id', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('Stone name needs to be at least 2 characters long'),
    body('category').trim().isLength({ min: 3 }).withMessage('Stone category needs to be at least 3 characters long'),
    body('color').trim().isLength({ min: 2 }).withMessage('Stone color needs to be at least 2 characters long'),
    body('formula').trim().isLength({ min: 3, max: 30 }).withMessage('Stone formula needs to be between 3 and 30 characters long'),
    body('location').trim().isLength({ min: 5, max: 15 }).withMessage('Stone location needs to be between 5 and 15 characters long'),
    body('description').trim().isLength({ min: 10 }).withMessage('Stone description needs to be at least 10 characters long'),
    body('image').trim().isURL({ require_tld: false }).withMessage('Stone image needs to be a valid url'),
    async (req, res) => {
        const stoneId = req.params.id
        const userId = req.user._id
        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await update(stoneId, req.body, userId);

            res.redirect('/catalog/' + stoneId);

        } catch (err) {
            res.render('edit', { data: req.body, errors: parseError(err).errors });
        }
    });
stoneRouter.get('/delete/:id', isUser(), async (req, res) => {
        const stoneId = req.params.id
        const userId = req.user._id
        try {
            const result = await deleteById(stoneId, userId);

            res.redirect('/catalog');

        } catch (err) {
            res.redirect('catalog' + stoneId);
        }
    });

module.exports = { stoneRouter };