import * as yup from "yup";

export const commentSchema = yup.object({
  content: yup.string().required("Content is required"),
  tweetId: yup.number().integer().required("Tweet ID is required"),
});
