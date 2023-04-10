const jwt = require('jsonwebtoken');
const { STATUS_CODE, STRING_CONSTANTS } = require('../utils/constants');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(STATUS_CODE.auth_error_status).json({
            status: { code: STATUS_CODE.auth_error_status, message: STRING_CONSTANTS.auth_failed, detail: null },
            data: null,
        });
    }
};