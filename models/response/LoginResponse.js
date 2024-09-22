class LoginResponse{
    id;
    firstName;
    lastName;
    email;
    designation;
    status; // "SUCCESS", "FAILURE"
    constructor(status){
        this.status = status;
    }
}
module.exports = LoginResponse;