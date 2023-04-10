const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true, },
    mobile_number: { type: String, required: true },
    // profile_image: { type: String, required: false, },
    // address: { type: String, required: false },
    // city: { type: String, required: false },
    // postcode: { type: String, required: false },
    // country: { type: String, required: false },
}, { versionKey: false, timestamps: { createdAt: 'date_joined', updatedAt: false } });

module.exports = mongoose.model('User', userSchema);