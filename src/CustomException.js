module.exports = function CustomException(status, message) {
  this.status = status;
  this.message = message;
};
