'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createArticle } from '@/actions/article';
import SubmitBtn from '@/app/_components/SubmitBtn';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { articleFormSchema } from '@/lib/schemas';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function Page() {
  const session = useSession();
  const form = useForm<z.infer<typeof articleFormSchema>>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  async function onSubmit(values: z.infer<typeof articleFormSchema>) {
    try {
      await createArticle({
        ...values,
        userId: session.data?.user?.id as string,
      });
      toast.success('create success');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('some thing went wrong');
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input placeholder="title" type="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>content</FormLabel>
              <FormControl>
                <Input type="content" placeholder="content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitBtn></SubmitBtn>
      </form>
    </Form>
  );
}
