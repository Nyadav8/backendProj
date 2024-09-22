class CreateProjectWorkforceRequest {
  constructor(obj) {
    this.projectId = obj.projectId;
    this.memberName = obj.memberName;
    this.designation = obj.designation;
    this.department = obj.department;
    this.budget = obj.budget;
    this.location = obj.location;
  }
}

module.exports = CreateProjectWorkforceRequest;
