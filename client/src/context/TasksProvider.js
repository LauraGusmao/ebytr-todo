import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TasksContext from './TasksContext';

import { getUsersTasks } from '../services/apiRequests';

function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const data = await getUsersTasks();
    setTasks(data);
  };

  // Ref: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  // https://www.w3schools.com/jsref/jsref_localecompare.asp
  const sortByStatusAsc = async () => {
    if (tasks.length === 0) return;
    const sortedTasks = await [...tasks].sort((a, b) => a.status.localeCompare(b.status));
    await setTasks(sortedTasks);
  };

  const sortByStatusDesc = async () => {
    if (tasks.length === 0) return;
    const sortedTasks = await [...tasks].sort((a, b) => b.status.localeCompare(a.status));
    await setTasks(sortedTasks);
  };

  const sortByTaskAsc = async () => {
    if (tasks.length === 0) return;
    const sortedTasks = await [...tasks].sort((a, b) => a.title.localeCompare(b.title));
    await setTasks(sortedTasks);
  };

  const sortByTaskDesc = async () => {
    if (tasks.length === 0) return;
    const sortedTasks = await [...tasks].sort((a, b) => b.title.localeCompare(a.title));
    await setTasks(sortedTasks);
  };

  const sortByDateAsc = async () => {
    if (tasks.length === 0) return;
    const sortedTasks = await [...tasks].sort((a, b) => a.date.localeCompare(b.date));
    await setTasks(sortedTasks);
  };

  const sortByDateDesc = async () => {
    if (tasks.length === 0) return;
    const sortedTasks = await [...tasks].sort((a, b) => b.date.localeCompare(a.date));
    await setTasks(sortedTasks);
  };

  const context = {
    tasks,
    setTasks,
    getTasks,
    sortByStatusAsc,
    sortByStatusDesc,
    sortByTaskAsc,
    sortByTaskDesc,
    sortByDateAsc,
    sortByDateDesc,
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TasksContext.Provider value={ context }>
      {children}
    </TasksContext.Provider>
  );
}

TasksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TasksProvider;
