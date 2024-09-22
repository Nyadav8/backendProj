class ProjectWorkforceListResponse {
  status;
  responseMessage;
  projectWorkforceDetail;
  totalRecords;
  dataChart;
  constructor() {
    this.projectWorkforceDetail = [];
    this.dataChart = {};
    this.totalRecords = 0;
  }
}
module.exports = ProjectWorkforceListResponse;
