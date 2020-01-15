module.exports = {
  stringToArray (string) {
    return string.split(',').map( elem => elem.trim());
  }
}