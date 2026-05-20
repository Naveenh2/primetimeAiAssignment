const { StatusCodes } = require('http-status-codes');
const taskService = require('../services/taskService');
const { sendResponse } = require('../utils/apiResponse');

const createTask = async (req, res) => {
  const task = await taskService.createTask(req.body, req.user.id);
  return sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Task created successfully',
    data: task
  });
};

const listTasks = async (req, res) => {
  const result = await taskService.listTasks(req.query, req.user);
  return sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tasks fetched successfully',
    data: result.tasks,
    meta: result.meta
  });
};

const getTaskById = async (req, res) => {
  const task = await taskService.getTaskById(req.params.id, req.user);
  return sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Task fetched successfully',
    data: task
  });
};

const updateTask = async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body, req.user);
  return sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Task updated successfully',
    data: task
  });
};

const deleteTask = async (req, res) => {
  await taskService.deleteTask(req.params.id, req.user);
  return sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Task deleted successfully'
  });
};

module.exports = { createTask, listTasks, getTaskById, updateTask, deleteTask };
