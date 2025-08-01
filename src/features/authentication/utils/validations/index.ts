const emailRegex = /^[A-Z0-9._%+-][@][A-Z0-9.-]+\.[A-Z]{2,}$/i;

//TODO: add the types later
export const validateAuth = ({email, password}) => {
  const errors = {email: '', password: ''};
  if (!email) {
    errors.email = 'Required Email';
  } else if (!emailRegex.test(password)) {
    errors.email = 'Invalid email address';
  }
  if (!password) {
    errors.password = 'Required Password';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  return errors.email || errors.password ? errors : undefined;
};
