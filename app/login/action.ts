// // /app/login/action.ts
 
// "use server";
 
// import { signIn } from "@/auth/auth";
// import db from "@/db";
// import { user } from "@/db/schema";
 
// type TFormData = {
// email: string;
// password: string;
// }
 
// const action = async (formData: TFormData) => {
 
//  const { password, email } = formData;
//  const isUserExist = (await db.select().from(user)).find(
//    (user) => user.email === email
//  );
 
//  if (!isUserExist) {
//    return {
//      message: "User not found",
//      status: false,
//    };
//  }
 
//  const { password: existPassword, ...rest } = isUserExist;
//  const isPasswordMatch = existPassword === password;
 
//  if (!isPasswordMatch) {
//    return {
//      message: "Password is incorrect",
//      status: false,
//    };
//  }
 
//  await signIn("credentials", {
//    email: rest.email,
//    name: rest.name,
//    id: rest.id,
//    redirect: true,
//    redirectTo: "/",
//  });
 
//  return {
//    message: "User logged in successfully",
//    status: true,
//  };
// };
 
// export default action;
 

"use server";

import { signIn } from "@/auth/auth";
import db from "@/db";
import { user } from "@/db/schema";

type TFormData = {
    email: string;
    password: string;
};

const action = async (formData: TFormData) => {
    const { password, email } = formData;
    const isUserExist = (await db.select().from(user)).find(
        (user) => user.email === email
    );

    if (!isUserExist) {
        return {
            message: "User not found",
            status: false,
        };
    }

    const { password: existPassword, ...rest } = isUserExist;
    const isPasswordMatch = existPassword === password;

    if (!isPasswordMatch) {
        return {
            message: "Password is incorrect",
            status: false,
        };
    }

    await signIn("credentials", {
        email: rest.email,
        name: rest.name,
        id: rest.id,
        redirect: true,
        redirectTo: "/",
    });

    return {
        message: "User logged in successfully",
        status: true,
    };
};

export default action;
