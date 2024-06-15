const jwt = require('jsonwebtoken');

const jwtManager = (user) => {
    const accessToken = jwt.sign({
        id: user.id,
        name: user.name,
    }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });

    return accessToken;
}

module.exports = jwtManager;