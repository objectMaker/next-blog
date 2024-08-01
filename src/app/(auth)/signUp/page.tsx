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

export default function Page() {
  const router = useRouter();
  // ...
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
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
          <Button type="submit" className="w-full">
            SignUp
          </Button>
        </form>
      </Form>
      <form action={createVerifyCode}>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            className="rounded border px-2 py-1"
          />
        </div>
        <footer>
          <button>提交</button>
        </footer>
      </form>
      <form action={verifyCode}>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            className="rounded border px-2 py-1"
          />
          <label htmlFor="code">code</label>
          <input type="text" name="code" className="rounded border px-2 py-1" />
        </div>
        <footer>
          <button>验证</button>
        </footer>
      </form>
    </div>
  );
}
