const END_POINTS = {
    register_url: `${process.env.API_VERSION}/register`,
    login_url: `${process.env.API_VERSION}/login`,
    user: `${process.env.API_VERSION}/user`,
    user_with_id_path: `${process.env.API_VERSION}/user/:userId`,
}

module.exports = END_POINTS;
