class EditBudgetRequest{
    constructor(obj){
        this.projectId = obj.projectId;
        this.budget = obj.budget;
    }
}
module.exports = EditBudgetRequest;