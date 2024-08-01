'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
import { handleSignUp } from '@/actions';
import { signUpFormSchema } from '@/lib/schemas';
import { createVerifyCode, verifyCode } from '@/lib/nodeMailer';
import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';

export default function Page() {
  const router = useRouter();
  const [count, setCount] = useState(0);
  let timer: NodeJS.Timeout;
  const btnRef = useRef(null);
  const handleGetVerifyCode = async (formData: FormData) => {
    let count = 60;
    timer = setInterval(() => {
      count = count - 1;
      setCount(count);
      if (count === 0) {
        clearInterval(timer);
      }
    }, 1000);
    await createVerifyCode(formData);
  };
  // ...
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      code: '',
    },
  });
  type FormValues = z.infer<typeof signUpFormSchema>;
  async function onSubmit(values: FormValues) {
    try {
      await handleSignUp(values);
      toast.success('sign up successful,please sign in', {
        className: 'text-green',
      });
      router.push('/signIn');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('create user failed,please try again!');
      }
    }
  }
  async function handleGetVerifyCodeClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await form.trigger('email');
    const { error } = form.getFieldState('email');
    if (error) {
      return;
    }
    const formData = new FormData();
    formData.append('email', form.getValues('email'));
    handleGetVerifyCode(formData);
  }
  return (
    <div>
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
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>verifyCode</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input
                      placeholder="verifyCode"
                      type="number"
                      {...field}
                      className="mr-2"
                    />
                    <Button
                      disabled={!!count}
                      type="button"
                      onClick={handleGetVerifyCodeClick}
                    >
                      <div className="flex">
                        <div>get verifyCode</div>
                        {count ? (
                          <div className="flex w-9 justify-end">({count}s)</div>
                        ) : (
                          ''
                        )}
                      </div>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            formAction={handleGetVerifyCode}
          >
            SignUp
          </Button>
        </form>
      </Form>
    </div>
  );
}
