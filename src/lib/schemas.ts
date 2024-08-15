import { z } from "zod";

// Define the image file schema
// const imageFileSchema = z.object({
//   file: z.instanceof(File),
//   type: z.enum(["image/jpeg", "image/png", "image/gif"]), // Allow specific image types
//   size: z.number().max(5 * 1024 * 1024), // Max size of 5MB
// });

const imageOnlyFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "Image must be smaller than 5MB",
  })
  .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
    message: "Only .jpg, .png, files are allowed",
  })
  .refine((file) => file! instanceof File, {
    message: "No Image file is selected",
  })
  .optional();

//   const formData = {
//     title: "My Board",
//     visibility: "public",
//     image: myImageFile, // Assume this is a File object
//   };

// try {
//   createBoardSchema.parse(formData);
//   // Valid data, proceed with logic
// } catch (e) {
//   console.error(e.errors);
//   // Handle validation errors
// }

export const createBoardSchema = z.object({
  title: z
    .string()
    .min(2)
    .max(50, { message: "Title must be between 2 and 50 characters" }),
  visibility: z.enum(["private", "public"], {
    errorMap: (issue, ctx) => {
      if (issue.code === "invalid_enum_value") {
        return { message: "Visibility must be either 'private' or 'public'" };
      }
      return { message: "Visibility is required" };
    },
    message: "Please select visibility",
  }),
  image: imageOnlyFileSchema,
});
