const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const username = req.headers.username;
    const password = req.headers.password;
    try {
        
        const foundAdmin = await Admin.findOne({ username: username, password: password });

        if (foundAdmin.username===username && foundAdmin.password===password) {
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

module.exports = adminMiddleware;