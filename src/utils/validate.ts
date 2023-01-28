const isValidEmail = (email: string) => {
  const validateEmail = new RegExp(
    /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
  );
  return validateEmail.test(email);
};

const isValidString = (name: string) => {
  const validateString = new RegExp(/^[a-z-]+$/);
  return validateString.test(name);
};

const isValidPhoneNumber = (phoneNumber: string) => {
  /** Valid formats  */
  // (123) 456-7890
  // (123)456-7890
  // 123-456-7890
  // 123.456.7890
  // 1234567890
  // +31636363634
  // 075-63546725
  const validatePhoneNumber = new RegExp(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  );
  return validatePhoneNumber.test(phoneNumber);
};

const isValidPassword = (password: string) => {
  //   "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  //  ^	                The password string will start this way
  // (?=.*[a-z])	    The string must contain at least 1 lowercase alphabetical character
  // (?=.*[A-Z])	    The string must contain at least 1 uppercase alphabetical character
  // (?=.*[0-9])       	The string must contain at least 1 numeric character
  // (?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
  // (?=.{6,})	        The string must be eight characters or longer
  const validatePassword = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))"
  );
  return validatePassword.test(password);
};

const isValidStringLength = (
  name: string,
  minimum: number,
  maximum: number
) => {
  if (name.length <= minimum || name.length >= maximum) {
    return false;
  }
  return true;
};

export default {
  isValidPhoneNumber,
  isValidEmail,
  isValidString,
  isValidPassword,
  isValidStringLength,
};
