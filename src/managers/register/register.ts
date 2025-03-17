export function validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return email.length < 254 && regex.test(email);
}

export function validatePassword(password: string): boolean {
    return password.length > 8 &&
           password.length < 128 &&
           /[A-Z]/.test(password) &&  // At least one uppercase letter
           /\d/.test(password);      // At least one number
}
