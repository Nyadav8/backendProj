class ApiResponse {
  constructor(data) {
    this.data = data;

    if (this.data == null) {
      this.code = 500;
    } else {
      this.code = 200;
    }
  }
}

module.exports = ApiResponse;
