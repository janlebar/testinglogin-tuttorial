// /app/register/page.tsx

'use client';

import React, { useState } from 'react';
import action from './action';
import z from 'zod';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.string().email('Email is invalid'),
  password: z.string().min(1, 'Password must be at least 6 characters'),
  name: z.string().min(3, 'Name must be at least 3 characters'),
});

const RegisterPage = () => {
  const { push } = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const name = data.get('name') as string;

    const schemaResult = schema.safeParse({ email, password, name });

    if (!schemaResult.success) {
      setError(schemaResult.error.errors[0].message);
      return;
    }

    try {
      const res = await action(schemaResult.data);
      if (res && !res?.status) {
        // Handle error response from action
        setError('Registration failed. Please try again.');
        return;
      }
      push('/login');
    } catch (error) {
      setError(error.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
