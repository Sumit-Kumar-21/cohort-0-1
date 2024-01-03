const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;

    try {
        
        const foundUser = await User.findOne({ username: username, password: password });

        if (foundUser.username===username && foundUser.password===password) {
            next();
        } else {
            res.status(400).json({
                msg: "Bad request, user not found or invalid credentials"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
}

module.exports = userMiddleware;