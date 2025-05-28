import { z } from "zod";

const signInSchema = z.object({
  //string نوعه (firstName,lastName,email,password,confirmPassword) بتاع type هنا عرفت ال
  email: z.string().min(1, { message: "Email address is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});

// هى اللى تعرفهولى zod بنفسى هخلى ال  TFormInputs بتاع ال type بدل ما اعرف ال
type signInType = z.infer<typeof signInSchema>;

export { signInSchema, type signInType };
