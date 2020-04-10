const bcrypt = require('bcryptjs');

exports.encrypt = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject(err)
            } else {
                resolve(hash);
            }
        });
    });
};

exports.decrypt = (userPassword, accountPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(userPassword, accountPassword, (err, authentication) => {
            if (err) { reject(err); }
            else { resolve(authentication); }
        })
    });
}