import { z } from "zod";

// Schema for the Forgot Password form (sending reset email)
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

// Schema for the Reset Password form
export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"), // Assuming email is also part of the form, or could be extracted from a URL param
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Schema for the Verify Reset Code form
export const verifyResetCodeSchema = z.object({
  resetCode: z.string().min(6, "Code must be at least 6 characters").max(6, "Code must be 6 characters").regex(/^[0-9]+$/, "Code must contain only numbers"), // Assuming a 6-digit numeric code
});
export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  password: z
    .string()
    .min(8, "New password must be at least 8 characters")
    .regex(/[A-Z]/, "New password must contain at least one uppercase letter")
    .regex(/[a-z]/, "New password must contain at least one lowercase letter")
    .regex(/[0-9]/, "New password must contain at least one number"),
  rePassword: z.string(), // Confirm new password
}).refine((data) => data.password === data.rePassword, {
  message: "New passwords don't match",
  path: ["rePassword"],
});

export type UpdatePasswordType = z.infer<typeof updatePasswordSchema>;
export type VerifyResetCodeType = z.infer<typeof verifyResetCodeSchema>;

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;