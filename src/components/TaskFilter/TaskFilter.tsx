import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import ReactPaginate from "react-paginate";
import cx from "classnames";
import { Button } from "styled";
import { changeFilter, deleteCompletedTasks, loadTasks } from "action";
import { getTasksWithStatus } from "utils";
import { RootState, ITask, QueryParams } from "types";
import { getTasks, getTotalElement } from "selectors";
import { ACTIVE, DONE, ALL } from "constant";
import {
  filterBlock,
  btnContainer,
  btn,
  selected,
  shadow,
  hidden,
  pagination,
  disable,
  link,
  margin,
} from "./taskFilter.module.scss";

interface TaskFilterProps extends QueryParams {
  filter: string;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ offset, limit, filter }) => {
  const dispatch: Dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => getTasks(state));

  const totalElement = useSelector((state: RootState) =>
    getTotalElement(state)
  );

  const doneTasks = getTasksWithStatus(tasks, DONE);
  const activeTasks = getTasksWithStatus(tasks, ACTIVE);

  const handleChangeFilter = (filter: string) => () => {
    dispatch(changeFilter({ filter, limit, offset: 1, redirect: true }));
  };

  const handleDelete = () => {
    const ids = doneTasks.map((task: ITask) => task.id);
    const redirect = doneTasks.length === tasks.length;
    const offsetPage = redirect && offset > 1 ? +offset - 1 : offset;
    dispatch(
      deleteCompletedTasks({ ids, offset: offsetPage, limit, redirect, filter })
    );
  };

  const pageCount: number = Math.ceil(totalElement / +limit);

  const onPageChange = ({ selected }: { selected: number }) => {
    dispatch(
      loadTasks({ offset: selected + 1, limit, redirect: true, filter })
    );
  };

  return (
    <>
      <div className={filterBlock}>
        <span className={margin}>{activeTasks.length} item left</span>
        <div className={btnContainer}>
          <Button
            className={cx(btn, margin, { [selected]: filter === ALL })}
            onClick={handleChangeFilter(ALL)}
            text="all"
          />

          <Button
            className={cx(btn, margin, { [selected]: filter === ACTIVE })}
            onClick={handleChangeFilter(ACTIVE)}
            text="active"
          />

          <Button
            className={cx(btn, margin, { [selected]: filter === DONE })}
            onClick={handleChangeFilter(DONE)}
            text="Completed"
          />
        </div>
        <Button
          className={cx(btn, margin, { [hidden]: doneTasks.length === 0 })}
          onClick={handleDelete}
          text="Clear Completed"
        />
      </div>

      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={onPageChange}
        pageClassName={cx(margin, { [hidden]: pageCount < 2 })}
        containerClassName={pagination}
        disabledClassName={disable}
        breakLinkClassName={link}
        activeLinkClassName={cx(selected)}
        pageLinkClassName={cx(link, margin)}
        nextLinkClassName={cx(link, { [hidden]: pageCount < 2 })}
        previousLinkClassName={cx(link, margin, { [hidden]: pageCount < 2 })}
        forcePage={+offset - 1}
        disableInitialCallback
      />
      <div className={shadow} />
    </>
  );
};

export default TaskFilter;
