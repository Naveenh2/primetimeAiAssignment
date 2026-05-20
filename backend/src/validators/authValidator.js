const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50).trim(),
    email: z.string().email().trim().toLowerCase(),
    password: z
      .string()
      .min(8)
      .max(64)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, 'Weak password')
  }),
  params: z.object({}),
  query: z.object({})
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email().trim().toLowerCase(),
    password: z.string().min(1)
  }),
  params: z.object({}),
  query: z.object({})
});

module.exports = { registerSchema, loginSchema };
