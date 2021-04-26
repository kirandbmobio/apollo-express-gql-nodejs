import * as yup from "yup";

const Title = yup
  .string()
  .min(3, "Title should have atleast 3 characters.")
  .max(200, "Title Name should have at most 200 characters.");
const Content = yup
  .string()
  .min(3, "Content should have atleast 3 characters.")
  .max(200, "Content Name should have at most 200 characters.");

export const NewPostValidationRules = yup.object().shape({
  Title,
  Content,
});
