class ApiError extends Error {
  constructor(
    statusCode,
    message = "Somthing went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.sucess = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.chaptureStackTrace(this, this.constructor);
    }
  }
}
export { ApiError };
