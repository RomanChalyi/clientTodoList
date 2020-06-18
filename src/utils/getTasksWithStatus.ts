import { ITask } from "types";

const getTasksWithStatus = (tasks: ITask[], status: string) => {
  return tasks.filter((task: any) => task.status === status);
};

export default getTasksWithStatus;
