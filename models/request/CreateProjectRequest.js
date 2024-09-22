class CreateProjectRequest{
    constructor(obj){
        this.projectName = obj.projectName;
        this.projectDescription = obj.projectDescription;
        this.budget = obj.budget;
        this.coplannerEmail = obj.coplannerEmail;
    }
}
module.exports = CreateProjectRequest;