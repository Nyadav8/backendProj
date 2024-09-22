class LoginRequest {
    constructor(obj) {
        this.email = obj.email;
        this.password = obj.password;
    }
}

module.exports = LoginRequest;