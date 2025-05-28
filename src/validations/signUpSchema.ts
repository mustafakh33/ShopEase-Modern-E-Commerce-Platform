import { z } from "zod";

const signUpSchema = z
  .object({
    //string نوعه (firstName,lastName,email,password,confirmPassword) بتاع type هنا عرفت ال 
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().min(1, { message: "Email address is required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters longs" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }), 
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Password and Confirm Password does not match",
    path: ["confirmPassword"],
  });

  // هى اللى تعرفهولى zod بنفسى هخلى ال  TFormInputs بتاع ال type بدل ما اعرف ال
type signUpType = z.infer<typeof signUpSchema>;

export {signUpSchema,type signUpType}