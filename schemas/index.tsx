import z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(5,
        {
            message: "Password is required",
        }
    ),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(8,
        {
            message: "Minimum 8 charecters is required",
        }
    ),
    name: z.string().min(3,
        {
            message: "Name is required",
        }
    ),
});