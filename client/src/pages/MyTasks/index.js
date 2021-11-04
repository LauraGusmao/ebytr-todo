import React, { useEffect, useState } from 'react';

import NavBar from '../../components/NavBar';
import TaskItem from '../../components/TaskItem';
import { getUsersTasks } from '../../services/apiRequests';
import './style.css';

function MyTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const data = await getUsersTasks();
      setTasks(data);
    };
    getTasks();
  }, []);
  console.log(tasks);
  return (
    <>
      <NavBar />
      <div className="container">
        <h3>Task List</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date</th>
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
