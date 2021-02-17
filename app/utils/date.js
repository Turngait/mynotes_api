function dateNow() {
  return new Date().toISOString().slice(0,10);
}

module.exports = {
  dateNow
}