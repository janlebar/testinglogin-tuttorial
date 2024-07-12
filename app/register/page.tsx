// // /app/register/page.tsx

// 'use client';

// import React, { useState } from 'react';
// import action from './action';
// import z from 'zod';
// import { useRouter } from 'next/navigation';

// const schema = z.object({
//   email: z.string().email('Email is invalid'),
//   password: z.string().min(1, 'Password must be at least 6 characters'),
//   name: z.string().min(3, 'Name must be at least 3 characters'),
// });

// const RegisterPage = () => {
//   const { push } = useRouter();
//   const [error, setError] = useState<string | null>(null);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const data = new FormData(e.currentTarget);
  //   const email = data.get('email') as string;
  //   const password = data.get('password') as string;
  //   const name = data.get('name') as string;

  //   const schemaResult = schema.safeParse({ email, password, name });

  //   if (!schemaResult.success) {
  //     setError(schemaResult.error.errors[0].message);
  //     return;
  //   }

  //   try {
  //     const res = await action(schemaResult.data);
  //     if (res && !res?.status) {
  //       // Handle error response from action
  //       setError('Registration failed. Please try again.');
  //       return;
  //     }
  //     push('/login');
  //   } catch (error) {
  //     setError(error.message || 'Something went wrong');
  //   }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <label htmlFor="name">Name</label>
//       <input id="name" name="name" type="text" />
//       <label htmlFor="email">Email</label>
//       <input id="email" name="email" type="email" />
//       <label htmlFor="password">Password</label>
//       <input id="password" name="password" type="password" />
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default RegisterPage;

// 'use client';

// import React, { useState, useTransition } from 'react';
// import { useRouter } from 'next/navigation';
// import * as z from 'zod';
// import { useForm } from "react-hook-form";
// import { zodResolver } from '@hookform/resolvers/zod';
// import { CardWrapper } from '@/components/auth/card-wrapper';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { FormError } from '@/components/form-error';
// import { FormSuccess } from '@/components/form-success';
// import { register } from '@/actions/register';
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '@/components/ui/form';
// import action from './action';

// // Schema for form validation
// const RegisterSchema = z.object({
//     email: z.string().email('Email is invalid'),
//     password: z.string().min(6, 'Password must be at least 6 characters'),
//     name: z.string().min(3, 'Name must be at least 3 characters'),
// });

// const RegisterPage = () => {
//     const { push } = useRouter();
//     const [error, setError] = useState<string | undefined>('');
//     const [success, setSuccess] = useState<string | undefined>('');
//     const [isPending, startTransition] = useTransition();

//     const form = useForm<z.infer<typeof RegisterSchema>>({
//         resolver: zodResolver(RegisterSchema),
//         defaultValues: {
//             email: '',
//             password: '',
//             name: '',
//         },
//     });

//     const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
      
//         setError('');
//         setSuccess('');

//         startTransition(() => {
//             register(values)
//                 .then((data) => {
//                     if (data.error) {
//                         setError(data.error);
//                     } else {
//                         setSuccess(data.success);
//                         push('/login');
//                     }
//                 })
//                 .catch((error) => {
//                     setError(error.message || 'Something went wrong');
//                 });
//         });
//     };

//     return (
//         <CardWrapper
//             headerLabel="Create an account"
//             backButtonLabel="Already have an account?"
//             backButttonHref="/auth/login"
//             showSocial
//         >
//             <div> {/* Added a single parent element here */}
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                         <div className="space-y-4">
//                             <FormField
//                                 control={form.control}
//                                 name="name"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Name</FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 {...field}
//                                                 disabled={isPending}
//                                                 placeholder="Name"
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="email"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Email</FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 {...field}
//                                                 disabled={isPending}
//                                                 placeholder="name@example.com"
//                                                 type="email"
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="password"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Password</FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 {...field}
//                                                 disabled={isPending}
//                                                 placeholder="*****"
//                                                 type="password"
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>
//                         <FormError message={error} />
//                         <FormSuccess message={success} />
//                         <Button
//                             disabled={isPending}
//                             type="submit"
//                             className="w-full"
//                         >
//                             Create an account
//                         </Button>
//                     </form>
//                 </Form>
//             </div>
//         </CardWrapper>
//     );
// };

// export default RegisterPage;

'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { register } from '@/actions/register';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

// Schema for form validation
const RegisterSchema = z.object({
    email: z.string().email('Email is invalid'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(3, 'Name must be at least 3 characters'),
});

const RegisterPage = () => {
    const { push } = useRouter();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            (async () => {
                const schemaResult = RegisterSchema.safeParse(values);

                if (!schemaResult.success) {
                    setError(schemaResult.error.errors[0].message);
                    return;
                }

                try {
                    const res = await register(schemaResult.data);
                    if (res && !res.status) {
                        setError('Registration failed. Please try again.');
                        return;
                    }
                    setSuccess('Registration successful!');
                    push('/login');
                } catch (error) {
                    setError(error.message || 'Something went wrong');
                }
            })();
        });
    };

    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButttonHref="/auth/login"
            showSocial
        >
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="name@example.com"
                                                type="email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="*****"
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            Create an account
                        </Button>
                    </form>
                </Form>
            </div>
        </CardWrapper>
    );
};

export default RegisterPage;
