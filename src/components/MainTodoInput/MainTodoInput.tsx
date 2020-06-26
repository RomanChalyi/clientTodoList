import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Input } from "styled";
import { addTask, changeTasksStatuses } from "action";
import { RootState, ITask, QueryParams } from "types";
import { getChecked } from "selectors";
import { DONE, ACTIVE, ALL } from "constant";
import { field, toggleAll, inputAdd } from "./mainTodoInput.module.scss";
import { socket } from "Root";

interface MainTodoInputProps extends QueryParams {
  tasks: ITask[];
  filter: string;
}

const MainTodoInput: React.FC<MainTodoInputProps> = ({
  limit,
  offset,
  tasks,
  filter,
}) => {
  const checked = useSelector((state: RootState) => getChecked(state));
  const dispatch = useDispatch();
  const [taskValue, setTaskValue] = useState<string>("");

  const handleChangeAdd = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setTaskValue(e.target.value);

  const handleChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const status = e.target.checked ? DONE : ACTIVE;
    const ids = tasks.map((task: ITask) => task.id);
    const redirect = filter !== ALL;
    const pageOffset = redirect && offset > 1 ? +offset - 1 : offset;

    dispatch(
      changeTasksStatuses({
        offset: pageOffset,
        limit,
        status,
        ids,
        redirect,
        filter,
      })
    );
  };
  useEffect(() => {
    socket.on("test", (data: any) => {
      console.log("++++++++++++++++++++++++++++++++++_________++++++++++++");
      console.log(data);
    });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>): void => {
      const enter = 13;
      const validate: boolean = e.keyCode === enter && !!taskValue.trim();
      if (validate) {
        dispatch(addTask({ value: taskValue, limit, offset, filter }));
        setTaskValue("");
      }
    },
    [dispatch, taskValue, offset, limit, filter]
  );

  return (
    <div className={field}>
      <Checkbox
        onChange={handleChangeCheckbox}
        id="toggle-ALL"
        className={toggleAll}
        checked={checked}
      />
      <Input
        className={inputAdd}
        onChange={handleChangeAdd}
        onKeyDown={handleKeyDown}
        value={taskValue}
        placeholder="What needs to be done?"
      />
      <button
        onClick={() => {
          socket.emit("click", socket.id, limit);
          // socket.on("click", (data: any) => {
          //   console.log(data, "response");
          // });
        }}
      >
        clickMe
      </button>
    </div>
  );
};

export default MainTodoInput;
