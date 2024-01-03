const jwt = require('jsonwebtoken');
const config = require("config")
const User = require('../models/user.model');

const userAuth = async (req, res, next) => {
    try {
        // Get the token from the request headers
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json( 'Token not found' );
        }
   try {
         const user = jwt.verify(token, config.get("jwtPrivateKey")); 

         // Get the user data from the decoded token by jwt.sign
         req.user = await User.findById(user.userId);
         console.log('Decoded Token', user);
   } catch (error) {
    return res.status(401).send("Invalid Token");
   }

        next();

    }
    catch (error) {
        console.error('Error in userAuth middleware:', error);
        return res.status(500).json( 'Internal Server Error' );
    }
};

module.exports = userAuth;
