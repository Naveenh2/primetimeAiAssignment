const { z } = require('zod');

const taskEnumStatus = z.enum(['TODO', 'IN_PROGRESS', 'DONE']);
const taskEnumPriority = z.enum(['LOW', 'MEDIUM', 'HIGH']);

const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(120).trim(),
    description: z.string().min(2).max(500).trim(),
    status: taskEnumStatus.optional(),
    priority: taskEnumPriority.optional()
  }),
  params: z.object({}),
  query: z.object({})
});

const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(120).trim().optional(),
    description: z.string().min(2).max(500).trim().optional(),
    status: taskEnumStatus.optional(),
    priority: taskEnumPriority.optional()
  }),
  params: z.object({
    id: z.string().min(1)
  }),
  query: z.object({})
});

const getTaskByIdSchema = z.object({
  body: z.object({}),
  params: z.object({
    id: z.string().min(1)
  }),
  query: z.object({})
});

const listTaskSchema = z.object({
  body: z.object({}),
  params: z.object({}),
  query: z.object({
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    status: taskEnumStatus.optional(),
    priority: taskEnumPriority.optional()
  })
});

module.exports = { createTaskSchema, updateTaskSchema, getTaskByIdSchema, listTaskSchema };
