const { StatusCodes } = require('http-status-codes');
const prisma = require('../config/prisma');
const ApiError = require('../utils/apiError');

const getTaskByIdForAccess = async (taskId, user) => {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Task not found');
  }
  if (user.role !== 'ADMIN' && task.userId !== user.id) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'You do not have access to this task');
  }
  return task;
};

const createTask = async (payload, userId) => {
  return prisma.task.create({
    data: {
      ...payload,
      userId
    }
  });
};

const listTasks = async (query, user) => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  const where = {
    ...(user.role === 'USER' ? { userId: user.id } : {}),
    ...(query.title ? { title: { contains: query.title, mode: 'insensitive' } } : {}),
    ...(query.description ? { description: { contains: query.description, mode: 'insensitive' } } : {}),
    ...(query.status ? { status: query.status } : {}),
    ...(query.priority ? { priority: query.priority } : {})
  };

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.task.count({ where })
  ]);

  return {
    tasks,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

const getTaskById = async (taskId, user) => getTaskByIdForAccess(taskId, user);

const updateTask = async (taskId, payload, user) => {
  await getTaskByIdForAccess(taskId, user);
  return prisma.task.update({
    where: { id: taskId },
    data: payload
  });
};

const deleteTask = async (taskId, user) => {
  await getTaskByIdForAccess(taskId, user);
  await prisma.task.delete({ where: { id: taskId } });
  return null;
};

module.exports = { createTask, listTasks, getTaskById, updateTask, deleteTask };
