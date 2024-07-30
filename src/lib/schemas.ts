import { z } from 'zod';

export const signInformSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, {
      message: 'password must be at least 6 characters.',
    })
    .max(22, {
      message: 'password must be less than 22 characters.',
    }),
});

export const signUpFormSchema = z
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
