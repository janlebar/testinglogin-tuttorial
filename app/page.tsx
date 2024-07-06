// /app/page.tsx
 
import { auth } from '@/auth/auth';
 
const HomePage = async () => {
  const user = await auth();
 
  return <h1>{JSON.stringify(user)}</h1>;
};