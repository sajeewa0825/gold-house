const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    // try {
    //     const accessToken = req.headers.authorization.replace('Bearer ', ''); // get token from header
    //     const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    //     req.user = decoded; // add user data to request
    // }catch (error) {
    //     return res.status(401).json({
    //         message: 'Auth failed'
    //     });
    // }

    next();
}

module.exports = auth;
