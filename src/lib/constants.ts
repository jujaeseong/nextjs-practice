export const EMAIL_DOMAIN = "@zod.com";
export const USERNAME_MIN_LENGTH = 5;
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_REGEX = new RegExp(/\d/);

export const EMAIL_DOMAIN_ERROR = "Only @zod.com emails are allowed.";
export const EMAIL_NOT_FOUND_ERROR =
  "An account with this email does not exist.";
export const USERNAME_MIN_LENGTH_ERROR =
  "Username should be at least 5 characters long.";
export const PASSWORD_MIN_LENGTH_ERROR =
  "Password should be at least 10 characters long.";
export const PASSWORD_REGEX_ERROR =
  "Password should contain at least one number (0123456789).";
export const INCORRECT_PASSWORD_ERROR =
  "The password you entered is incorrect.";

export const USERNAME_DUPLICATE_ERROR = "This username is already taken";
export const EMAIL_DUPLICATE_ERROR = "This email is already taken";
export const CONFIRM_PASSWORD_ERROR = "Passwords must be the same.";

export const TWEET_REQUIRED_ERROR = "Please fill out the required fields.";
