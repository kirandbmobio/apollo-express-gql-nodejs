import * as yup from "yup";

const username = yup
  .string()
  .required("Username is required.")
  .min(5, "Username should have atleast 5 characters.")
  .max(20, "Username should have at most 20 characters.")
  .matches(/^\w+$/, "Should be alphanumeric");

const email = yup.string().email().matches(/^\w+$/, "Should be alphanumeric");

const firstName = yup
  .string()
  .min(3, "First Name should have atleast 3 characters.")
  .max(200, "First Name should have at most 200 characters.")
  .matches(/^\w+$/, "Should be alphanumeric");

const lastName = yup
  .string()
  .min(3, "Last Name should have atleast 3 characters.")
  .max(200, "Last Name should have at most 200 characters.")
  .matches(/^\w+$/, "Should be alphanumeric");

const password = yup
  .string()
  .min(3, "Last Name should have atleast 3 characters.")
  .max(200, "Last Name should have at most 200 characters.");

export const UserRegistrationRules = yup.object().shape({
  username,
  email,
  firstName,
  lastName,
  password,
});

export const UserAuthenticationRules = yup.object().shape({
  username,
  password,
});
