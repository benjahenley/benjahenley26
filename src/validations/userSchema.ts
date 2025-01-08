// validations/userSchema.ts
import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});
