import * as yup from "yup";

export const tweetIdSchema = yup.object({
  id: yup
    .number()
    .required("Tweet ID is required")
    .integer("Tweet ID must be an integer")
    .positive("Tweet ID must be a positive number"),
});
