const path = require('path');
const jwt = require('jsonwebtoken');

const adminRegForm = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public', 'adminReg.html'));
    } catch (error) {
        res.status(400).send('Something went wrong!');
    }
};

module.exports = adminRegForm;
