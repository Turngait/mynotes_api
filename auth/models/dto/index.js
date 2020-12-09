class DTO {
  constructor() {
    this.response = {}
  }

  setData(data) {
    this.response.data = data
  }

  setStatusText(text) {
    this.response.statusText = text
  }

  setErrors(error) {
    this.response.error = error
  }

  setStatus(status) {
    this.response.status = status
  }

  getResponse() {
    return this.response
  }
}

module.exports = DTO
