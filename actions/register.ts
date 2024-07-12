// "use server";

// import * as z from "zod";

// import { RegisterSchema } from "@/schemas";


// export const register = async(values:z.infer<typeof RegisterSchema>) => {
//     const validatedFields = RegisterSchema.safeParse(values);
//     if (!validatedFields.success) {
//         return {error: "Invalid fields!"};
//     }
//     return {success:"Email sent"};
//     };

"use server";

import db from "@/db";
import { user } from "@/db/schema";

type TFormData = {
    email: string;
    password: string;
    name: string;
};

export const register = async (formData: TFormData) => {
    const { email, password, name } = formData;

    const isUserExist = (await db.select().from(user)).find(
        (user) => user.email === email
    );

    if (isUserExist) {
        return {
            message: "User already exists",
            status: false,
        };
    }

    await db.insert(user).values({
        email,
        password, // Store plain text password for now (insecure)
        name,
    });

    return {
        message: "User registered successfully",
        status: true,
    };
};
