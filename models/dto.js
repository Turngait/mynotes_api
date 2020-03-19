class DTO {
  constructor() {
    this.response = {}
  }

  setData(data) {
    this.response.data = data
  }

  setStatus(status) {
    this.response.status = status
  }

  getResponse() {
    return this.response
  }
}

module.exports = DTO
