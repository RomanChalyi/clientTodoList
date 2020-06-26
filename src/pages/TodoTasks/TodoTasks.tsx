import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import qs from "qs";
import { MainTodoInput, TodoList, TaskFilter } from "components";
import { Paragraph, PageContainer } from "styled";
import { getTasks, getOffset, getLimit, getFilter } from "selectors";
import { RootState } from "types";
import { loadTasks, updateTasks } from "action";
import {
  title,
  todo,
  todoContainer,
  footer,
  list,
} from "./todoTasks.module.scss";
import { socket } from "App";

const footerList: string[] = [
  "Double-click to edit a todo",
  "Created by Todo",
  "Part of odoMVC",
];

const TodoTask: React.FC<RouteComponentProps> = ({ location }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => getTasks(state));
  const storeOffset = useSelector((state: RootState) => getOffset(state));
  const storeLimit = useSelector((state: RootState) => getLimit(state));
  const filter = useSelector((state: RootState) => getFilter(state));

  useEffect(() => {
    const { page, limit } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const paramsOffset: any =
      page !== undefined && !isNaN(+page) ? page : storeOffset;
    const paramsLimit: any =
      limit !== undefined && !isNaN(+limit) ? limit : storeLimit;

    dispatch(
      loadTasks({
        offset: paramsOffset,
        limit: paramsLimit,
        filter,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("load tasks", () => {
      console.log("+++++++++++++++++++++++");
      const { page, limit } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      const paramsOffset: any =
        page !== undefined && !isNaN(+page) ? page : storeOffset;
      const paramsLimit: any =
        limit !== undefined && !isNaN(+limit) ? limit : storeLimit;

      dispatch(
        updateTasks({
          offset: paramsOffset,
          limit: paramsLimit,
          filter,
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <PageContainer>
      <h1 className={title}>todos</h1>
      <div className={todo}>
        <div className={todoContainer}>
          <MainTodoInput
            tasks={tasks}
            offset={storeOffset}
            limit={storeLimit}
            filter={filter}
          />

          <TodoList
            offset={storeOffset}
            limit={storeLimit}
            className={list}
            filter={filter}
          />

          <TaskFilter offset={storeOffset} limit={storeLimit} filter={filter} />
        </div>
      </div>
      <div className={footer}>
        {footerList.map((text, index) => (
          <Paragraph key={index} text={text} />
        ))}
      </div>
    </PageContainer>
  );
};

export default TodoTask;
