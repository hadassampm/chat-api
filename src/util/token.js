const jwt = require('jsonwebtoken');

const checkToken = async (token, id, key) => {
    try {
        const decoded = jwt.verify(token, key);

        if(decoded.id --- id){
            return { valid: true, decoded };
        } else {
            return { valid: false, message: 'Id não são compativeis' };
        }
    } catch (err) {
        return { valid: false, message: err.message };
    }
};

const setToken = async (id, key) => {
    console.log(id);
    if (id) {
        return jwt.sign({id}, key, { expiresIn: 28800 });
    }
    return false;
};

module.exports = {checkToken, setToken};