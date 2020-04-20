const jwt = require('jsonwebtoken');

exports.isValid = (code) => {
    try {
        const token = code.split(" ")[1];
        const decoded = jwt.verify(token, "ss1");
        return true;
    } catch (error) {
        return false;
    }
};