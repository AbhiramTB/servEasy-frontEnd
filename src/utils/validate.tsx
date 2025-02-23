// export const emailRegex='dfdf'
// export const phoneNumberRegex=''
// export const userNameRegex=""

// export const

export const validateEmail = (email: string): boolean =>
/^[a-zA-Z0-9]+@gmail\.com$/.test(email);

export const validatePhone = (phone: string): boolean =>
 /^\d{10}$/.test(phone);

export const validateUserName = (userName: string): boolean =>
/^[a-zA-Z]{3,}$/?.test(userName);

export const validatePassword = (password: string): boolean =>
/^(?=.*[!@#$%&*])[a-zA-Z0-9!@#$%&*]{6,}$/.test(password);
