const { Router } = require("express");
const { create } = require("../services/stoneService");
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

            const result = await create(req.body, authorId);
            // res.redirect('/details/' + result._id);
            res.redirect('/');

        } catch (err) {
            res.render('create', { data: req.body, errors: parseError(err).errors });
        }
    });

module.exports = { stoneRouter };