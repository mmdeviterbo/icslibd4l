const jwt = require("jsonwebtoken");
const config = require("config")

const jwtPrivateKey = config.get('jwtPrivateKey');

//npm install cookie-parser
//makes sure that the current user is allowed to access a part of the website
function authenticationFaculty(req, res, next){
    try{
        const token = req.cookies.token;
        //checks if token exists
        if (!token)
            return res
                    .status(401)
                    .json({
                        errorMessage: "Unauthorized Access"
                    });
        //verifies the jwt payload
        const verified = jwt.verify(token, jwtPrivateKey);
        //attaches a user property to the req object in the request Router function
        req.user = verified.user;

        if (verified.userType === 3 || verified.userType === 2 || verified.userType === 1)
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

module.exports = authenticationFaculty;