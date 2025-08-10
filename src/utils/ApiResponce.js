class ApiResponce {
  constructor(statusCode, data, message = "success") {
    this.statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
