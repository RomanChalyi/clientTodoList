import React, { useState, useCallback, useEffect } from "react";
import cx from "classnames";
import { Button, Checkbox, Input } from "styled";
import { ITask } from "types";
import { DONE } from "constant";
import {
  item,
  itemCheckbox,
  itemLabel,
  deleteBtn,
  itemEdit,
  itemLabelDone,
} from "./todoItem.module.scss";

interface TodoItemProps {
  handleChangeStatusTask(task: ITask): () => void;
  saveEditTaskValue(task: ITask): void;
  handleDeleteTask(task: ITask): void;
  task: ITask;
  showMessage(value: string, isError?: boolean): void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  handleChangeStatusTask,
  saveEditTaskValue,
  handleDeleteTask,
  task,
  showMessage,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [taskValue, setTaskValue] = useState<string>(task.value);

  const handleChangeTaskValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTaskValue(e.target.value);

  const handleChangeEditStatus = () => setEdit(!edit);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent): void => {
      const enter = 13;
      if (e.keyCode === enter) {
        setEdit(false);
      }
    },
    [setEdit]
  );

  const onBlur = (): void => {
    const validate = taskValue.trim();

    setEdit(false);
    if (validate && taskValue !== task.value) {
      task.value = taskValue;
      return saveEditTaskValue(task);
    } else if (!validate) {
      setTaskValue(task.value);
      showMessage("Task name cannot be empty", true);
    }
  };

  const onClick = (): void => handleDeleteTask(task);

  useEffect(() => {
    setTaskValue(task.value);
  }, [task]);

  return (
    <li className={item}>
      <Checkbox
        className={itemCheckbox}
        onChange={handleChangeStatusTask(task)}
        id={task.id}
        checked={task.status === DONE}
      />

      <label
        onDoubleClick={handleChangeEditStatus}
        className={cx(
          itemLabel,
          { dn: edit },
          { [itemLabelDone]: task.status === DONE }
        )}
      >
        {task.value}
      </label>
      <Button text="×" onClick={onClick} className={deleteBtn} />

      <Input
        onChange={handleChangeTaskValue}
        onKeyDown={onKeyDown}
        value={taskValue}
        className={edit ? itemEdit : "dn"}
        disabled={!edit}
        onBlur={onBlur}
      />
    </li>
  );
};

export default TodoItem;
