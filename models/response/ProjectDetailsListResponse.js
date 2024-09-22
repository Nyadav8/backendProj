class ProjectListResponse{
    status;
    responseMessage;
    projectDetailsList; // ProjectDetails list
    constructor(){
        this.projectDetailsList = [];
    }
}

module.exports = ProjectListResponse;