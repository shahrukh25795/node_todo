
const STRING_CONSTANTS = {
    user_created: "User created successfully.",
    user_exists: "Email id already exists.",
    login_success: 'Login successful!',
    auth_failed: 'Auth failed!',
    data_not_found: 'Data not found!',
    user_deleted: 'User deleted!',
    user_updated: 'User updated!'
}

const STATUS_CODE = {
    success_status: 200,
    internal_server_error_status: 500,
    auth_error_status: 401,
    error_status: 403,
}

const PRECONFIG = {
    token_expires_in: '24h'
}

module.exports = { STRING_CONSTANTS, STATUS_CODE, PRECONFIG }