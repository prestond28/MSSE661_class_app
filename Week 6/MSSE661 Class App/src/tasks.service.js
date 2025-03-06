import { BASE_API_URL } from "./api.config";
import { _delete, _get, _post, DEFAULT_OPTIONS_WITH_AUTH, OPTIONS_WITH_AUTH } from "./service-helpers";


export const TASKS_API = `${BASE_API_URL}/tasks`; // http://localhost:3000/api/tasks

export const getTasks = () => _get(TASKS_API, OPTIONS_WITH_AUTH);

export const addTask = (formData) =>
  _post(TASKS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

export const deleteTask = (taskId) =>
  _delete(`${TASKS_API}/${taskId}`, OPTIONS_WITH_AUTH);
