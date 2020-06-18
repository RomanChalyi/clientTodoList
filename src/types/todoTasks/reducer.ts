import { ITask, QueryParams } from "types";

export interface StateTodoTasks extends QueryParams {
  filter: any;
  tasks: ITask[];
  totalElements: number;
}
