import { z } from 'zod';
import validator from 'validator';

export const loginSchema = z.object({
  email: z.string().email('Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(50),
});

export const registrationSchema = z.object({
  name: z.string().min(2),
  phone: z.string().refine(validator.isMobilePhone),
  email: z.string().email('Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(50),
});
