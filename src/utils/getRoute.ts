import { TASKS_PATH } from "constant";
import { ITask } from "types";

const getRoute = (task: ITask): string => {
  return TASKS_PATH + `/${task.id}`;
};

export default getRoute;
