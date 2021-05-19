const jwt = require("jsonwebtoken");
const config = require("config")

const jwtEncrypt = require("jwt-token-encrypt");
const jwtPrivateKey = config.get('jwtPrivateKey');

//npm install cookie-parser
//makes sure that the current user is allowed to access a part of the website
function authenticationStudent(req, res, next){
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
                    .status(401)
                    .json({
                        errorMessage: "Unauthorized Access"
                    });
         //decrypt token and verifies jwt payload
         const decrypted = jwtEncrypt.readJWT(token, encryption, 'ICSlibrary');
                    
         const verified = decrypted.data;
        //attaches a user property to the req object in the request Router function
        req.user = verified.user;

        if (verified.userType === 4 || verified.userType === 3 || verified.userType === 2 || verified.userType === 1)
            next();
        else
            return res
                .sendStatus(401)
                .json({
                    errorMessage: "Unauthorized Access"
                });
    }
    catch(err){
        console.log(err)    
        res.send(401).json({ errorMessage: "Unauthorized Access" });
    }
}

module.exports = authenticationStudent;