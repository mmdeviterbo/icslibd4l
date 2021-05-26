const config = require("config")
const jwt = require("jsonwebtoken");
const jwtPrivateKey = config.get('jwtPrivateKey');
const jwtEncrypt = require("jwt-token-encrypt");

//npm install cookie-parser
//makes sure that the current user is allowed to access a part of the website
function authenticationAdmin(req, res, next){
    console.log(req.body)
    try{
        const token = req.cookies.token;
          // Encryption settings
        const encryption = {
            key: jwtPrivateKey,
            algorithm: 'aes-256-cbc',
        };
        //checks if token exists
        if (!token)
            return res
                    .sendStatus(401)
                    .json({
                        errorMessage: "Unauthorized Access"
                    });
        //decrypt token and verifies jwt payload
        const decrypted = jwtEncrypt.readJWT(token, encryption, 'ICSlibrary');
                
        const verified = decrypted.data;

        if (verified.userType === 1)
            next();
        else
            return res
                .status(401)
                .json({
                    errorMessage: "Unauthorized Access"
                });
    }
    catch(err){
        console.log(err)    
        res.send(401).json({ errorMessage: "Unauthorized Access" });
    }
}

module.exports = authenticationAdmin;