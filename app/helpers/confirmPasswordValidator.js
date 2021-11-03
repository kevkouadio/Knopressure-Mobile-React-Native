export function confirmPasswordValidator(password, confirmPassword) {
    if (!confirmPassword || password !== confirmPassword) return "Password doen't match."
    // if (password.length < 6) return 'Password must be at least 6 characters long.'
    // return ''
  }