import * as yup from "yup";

export const tweetSchema = yup.object({
  date: yup.date().default(() => new Date()),
  tweetImages: yup
    .array()
    .of(
      yup.object({
        src: yup
          .string()
          .url("Invalid image URL")
          .required("Image URL is required"),
        alt: yup.string().required("Alt text is required for accessibility"),
      })
    )
    .required("Images are required"),

  techStack: yup.array().of(yup.string()).required("Tech stack is required"),
  trendingInfo: yup.boolean().default(false),
  category: yup
    .mixed<"PROJECT" | "FEED">()
    .oneOf(["PROJECT", "FEED"], "Category must be either 'PROJECT' or 'FEED'")
    .required("Category is required"),

  pinned: yup.boolean().default(false),
  userId: yup.number().integer().required("User ID is required"),
  translations: yup
    .array()
    .of(
      yup.object({
        language: yup.string().required("Translation language is required"),
        content: yup.string().required("Translation content is required"),
      })
    )
    .min(1, "At least one translation is required")
    .required("Translations are required"),
});
