import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import {
  deleteTask,
  changeStatusTask,
  editTaskValue,
  showMessage,
} from "action";
import { RootState, ITask, QueryParams } from "types";
import { DONE, ACTIVE, ALL } from "constant";
import { getVisiblyTasks } from "selectors";
import { title } from "./todoList.module.scss";

interface TodoListProps extends QueryParams {
  filter: string;
  className?: string;
}

const TodoList: React.FC<TodoListProps> = ({
  className,
  offset,
  limit,
  filter,
}) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => getVisiblyTasks(state));

  const saveEditTaskValue = (task: ITask) => {
    return dispatch(editTaskValue({ offset, limit, task, filter }));
  };

  const handleChangeStatusTask = (task: ITask) => () => {
    task.status = task.status === DONE ? ACTIVE : DONE;
    const redirect = tasks.length === 1 && filter !== ALL;
    const pageOffset = redirect && offset > 1 ? +offset - 1 : offset;

    return dispatch(
      changeStatusTask({ task, limit, offset: pageOffset, redirect, filter })
    );
  };

  const handleDeleteTask = (task: ITask) => {
    const redirect = tasks.length === 1;
    const pageOffset = redirect && offset > 1 ? +offset - 1 : offset;
    dispatch(deleteTask({ task, offset: pageOffset, limit, filter, redirect }));
  };

  const handleShowMessage = (text: string, isError: boolean) => {
    dispatch(showMessage({ text, isError }));
  };

  const text =
    filter === ALL ? "No tasks created" : "No tasks with this status";
  const renderTasks =
    tasks.length === 0 ? (
      <p className={title}>{text}</p>
    ) : (
      tasks.map((task: ITask, i: number) => (
        <TodoItem
          task={task}
          saveEditTaskValue={saveEditTaskValue}
          handleChangeStatusTask={handleChangeStatusTask}
          handleDeleteTask={handleDeleteTask}
          showMessage={handleShowMessage}
          key={task.id}
        />
      ))
    );

  return <ul className={className}>{renderTasks}</ul>;
};

export default TodoList;
