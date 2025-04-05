const validatePassword = (req, res, next) => {
  const { password } = req.body;

  // password validation
  const minLength = password.length >= 6;
  const hasSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
    password
  );
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  // check if all condition are met
  if (!minLength || !hasSpecialCharacters || !hasUpperCase || !hasNumber) {
    return res.status(400).json({
      message:
        "password must have at least 6 characters, include special character, uppercase letter, and number.",
    });
  }

  // If validation passes, continue to the next middleware/route handler
  next();
};

export default validatePassword;
