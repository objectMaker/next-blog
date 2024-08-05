'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { credentialSignInAction } from '@/actions';
import { useRouter } from 'next/navigation';
import { signInformSchema } from '@/lib/schemas';
import { useSession } from 'next-auth/react';

export default function Page() {
  const session = useSession();
  console.log(session, 'session');
  // ...
  const form = useForm<z.infer<typeof signInformSchema>>({
    resolver: zodResolver(signInformSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof signInformSchema>) {
    try {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);
      await credentialSignInAction(formData);
      // toast.success('登录成功,自动跳转至首页', {
      //   className: 'text-green',
      // });
      router.push('/');
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message, 'err');
        return toast.error(err.message);
      }
      toast.error('login failed');
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="email" type="email" {...field} />
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
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
