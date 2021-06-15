const jwtEncrypt = require("jwt-token-encrypt");
const jwtPrivateKey = process.env.jwtPrivateKey;

//npm install cookie-parser
//makes sure that the current user is allowed to access a part of the website
function authenticationFaculty(req, res, next) {
    try {
        const token = req.cookies.token;

        //checks if token exists
        if (!token)
            return res.sendStatus(401).json({
                errorMessage: "Unauthorized Access",
            });

        //NEW IMPLEMENTATION
        // Encryption settings
        const encryption = {
            key: jwtPrivateKey,
            algorithm: "aes-256-cbc",
        };
        //decrypt token and verifies jwt payload
        const decrypted = jwtEncrypt.readJWT(token, encryption, "ICSlibrary");
        const verified = decrypted.data;

        //attaches a user property to the req object in the request Router function
        req.user = verified.user;

        if (
            verified.userType === 3 ||
            verified.userType === 2 ||
            verified.userType === 1
        )
            next();
        else
            return res.sendStatus(401).json({
                errorMessage: "Unauthorized Access",
            });
    } catch (err) {
        console.log(err);
        return res
            .sendStatus(401)
            .json({ errorMessage: "Unauthorized Access" });
    }
}

module.exports = authenticationFaculty;
