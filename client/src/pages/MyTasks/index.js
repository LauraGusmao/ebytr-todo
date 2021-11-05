import React, { useContext, useEffect } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import TasksContext from '../../context/TasksContext';
import NavBar from '../../components/NavBar';
import TaskItem from '../../components/TaskItem';
import './style.css';

function MyTasks() {
  const { tasks,
    getTasks,
    sortByStatusAsc,
    sortByStatusDesc,
    sortByTaskAsc,
    sortByTaskDesc,
    sortByDateAsc,
    sortByDateDesc,
  } = useContext(TasksContext);

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container">
        <h3>Task List</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                Task
                <TiArrowSortedDown onClick={ sortByTaskAsc } />
                <TiArrowSortedUp onClick={ sortByTaskDesc } />
              </th>
              <th>Description</th>
              <th>
                Status
                <TiArrowSortedDown onClick={ sortByStatusAsc } />
                <TiArrowSortedUp onClick={ sortByStatusDesc } />
              </th>
              <th>
                Date
                <TiArrowSortedDown onClick={ sortByDateAsc } />
                <TiArrowSortedUp onClick={ sortByDateDesc } />
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { tasks.map((task, index) => <TaskItem task={ task } key={ index } />)}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MyTasks;
