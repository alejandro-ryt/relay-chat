// Define / Test password format
export function validatePasswordFormat(password: string): boolean {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|\\:;"<>,.?/-]).{8,20}$/.test(password);
}

// Define / Test email format
export function validateEmailFormat(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}