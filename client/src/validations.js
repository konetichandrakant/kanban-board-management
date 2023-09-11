const validateUsername = (username) => {
  let regexPattern = /^[a-zA-Z0-9]{1,}$/;
  return username.match(regexPattern);
}
const validateName = (name) => {
  let regexPattern = /^([a-zA-Z ]){1,30}$/;
  return name.match(regexPattern);
}

const validatePassword = (password) => {
  let regexPattern = /^[a-zA-Z0-9@#$]{8,16}$/;
  return password.match(regexPattern);
}

const loggedIn = () => {
  const userDetails = window.localStorage.getItem('user-details');
  if (userDetails === null || userDetails === undefined)
    return false;
  return userDetails;
}

const BASE_URL = 'http://localhost:5000'

module.exports = { validateName, validatePassword, validateUsername, loggedIn, BASE_URL };