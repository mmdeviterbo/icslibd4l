const jwtEncrypt = require("jwt-token-encrypt");
const jwtPrivateKey = process.env.jwtPrivateKey;

//npm install cookie-parser
//makes sure that the current user is allowed to access a part of the website
function authenticationAdmin(req, res, next) {
    try {
        const token = req.cookies.token;
        //checks if token exists
        if (!token)
            return res.sendStatus(401).json({
                errorMessage: "Unauthorized Access",
            });

        // NEW IMPLEMENTATION
        // Encryption settings
        const encryption = {
            key: jwtPrivateKey,
            algorithm: "aes-256-cbc",
        };

        // decrypt token and verifies jwt payload
        const decrypted = jwtEncrypt.readJWT(token, encryption, "ICSlibrary");
        const verified = decrypted.data;

        //checks if token exists
        if (!token)
            return res.sendStatus(401).json({
                errorMessage: "Unauthorized Access",
            });

        if (verified.userType === 1) next();
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

module.exports = authenticationAdmin;
