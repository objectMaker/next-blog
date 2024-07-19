'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { useRouter } from 'next/navigation';

const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, {
        message: 'password must be at least 6 characters.',
      })
      .max(22, {
        message: 'password must be less than 22 characters.',
      }),
    confirmPassword: z
      .string()
      .min(6, {
        message: 'password must be at least 6 characters.',
      })
      .max(22, {
        message: 'password must be less than 22 characters.',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function Page() {
  // ...
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const cValues = {
      ...values,
    };
    delete cValues.confirmPassword;
    const res = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        ...cValues,
        username: 'pig hero No.' + Date.now(),
      }),
    });
    try {
      await res.json();
      alert('自动登录');
      router.replace('/profile');
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
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
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>confirmPassword</FormLabel>
              <FormControl>
                <Input
                  placeholder="confirmPassword"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          SignUp
        </Button>
      </form>
    </Form>
  );
}
