const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require('../models/user');
const { STRING_CONSTANTS, STATUS_CODE, PRECONFIG } = require("../utils/constants");

exports.user_register = (req, res, next) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) return res.status(STATUS_CODE.internal_server_error_status).json({ error: err });
                else {
                    const payload = { ...req.body };
                    payload._id = new mongoose.Types.ObjectId();
                    payload.password = hash;
                    const userModal = new User(payload);
                    userModal.save().then(result => {
                        const token = jwt.sign({ email: result?.email, userId: result?._id }, process.env.JWT_KEY, { expiresIn: PRECONFIG.token_expires_in });
                        return res.status(STATUS_CODE.success_status).json({
                            status: { code: STATUS_CODE.success_status, message: STRING_CONSTANTS.user_created, detail: null },
                            data: result,
                            token: { access: token, refresh: null },
                        })
                    }).catch(err => res.status(STATUS_CODE.internal_server_error_status).json({ error: err }));
                }
            })
            return
        }
        return res.status(STATUS_CODE.error_status).json({
            status: { code: STATUS_CODE.error_status, message: STRING_CONSTANTS.user_exists, detail: null },
            data: null,
        });
    })
};

exports.user_login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then((user) => {
        bcrypt.compare(req.body.password, user?.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ email: user?.email, userId: user?._id }, process.env.JWT_KEY, { expiresIn: PRECONFIG.token_expires_in });
                return res.status(STATUS_CODE.success_status).json({
                    status: { code: STATUS_CODE.success_status, message: STRING_CONSTANTS.login_success, detail: null },
                    data: user,
                    token: { access: token, refresh: null },
                });
            }
            return res.status(STATUS_CODE.error_status).json({
                status: { code: STATUS_CODE.auth_error_status, message: STRING_CONSTANTS.auth_failed, detail: null },
                data: null,
            });
        });
    })

};

exports.get_all_user = (req, res, next) => {
    User.find().select("-password").then(users => res.status(STATUS_CODE.success_status).json({
        status: { code: STATUS_CODE.success_status, message: null, detail: null },
        data: users,
    })).catch(err => res.status(STATUS_CODE.error_status).json({
        status: { code: STATUS_CODE.error_status, message: STRING_CONSTANTS.data_not_found, detail: err },
        data: [],
    }));
};

exports.user_delete = (req, res, next) => {
    User.findByIdAndDelete(req.params.userId).then(result => res.status(STATUS_CODE.success_status).json({
        status: { code: STATUS_CODE.success_status, message: STRING_CONSTANTS.user_deleted, detail: null },
        data: null,
    })).catch(err => res.status(STATUS_CODE.error_status).json({
        status: { code: STATUS_CODE.error_status, message: null, detail: err },
        data: null,
    }));
};

exports.user_details = (req, res, next) => {
    User.findById(req.params.userId).select("-password").then(result => res.status(STATUS_CODE.success_status).json({
        status: { code: STATUS_CODE.success_status, message: null, detail: null },
        data: result,
    })).catch(err => res.status(STATUS_CODE.error_status).json({
        status: { code: STATUS_CODE.error_status, message: null, detail: err },
        data: null,
    }));
};

exports.update_user_details = (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true }).select("-password").then(result => res.status(STATUS_CODE.success_status).json({
        status: { code: STATUS_CODE.success_status, message: STRING_CONSTANTS.user_updated, detail: null },
        data: result,
    })).catch(err => res.status(STATUS_CODE.error_status).json({
        status: { code: STATUS_CODE.error_status, message: null, detail: err },
        data: null,
    }));
};


