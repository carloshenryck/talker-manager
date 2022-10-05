const passwordValidation = (password) => password.length > 6;

const emailValidation = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  console.log(email.match(regex));
  return regex.test(email);
};

module.exports = {
  passwordValidation,
  emailValidation,
};