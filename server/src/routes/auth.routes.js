const controller = require("../controllers/auth.controller");
const { check } = require('express-validator');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/customers/register",
        [
            check('email', 'Please include a valid email').isEmail(),
            check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
        ],
        controller.registerCustomer
    );

    app.post("/api/customers/login", controller.loginCustomer);

    app.post("/api/users/login", controller.loginUser);

    // Alias for user request
    app.post(
        "/api/auth/register",
        [
            check('email', 'Please include a valid email').isEmail(),
            check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
        ],
        controller.registerCustomer
    );
};
