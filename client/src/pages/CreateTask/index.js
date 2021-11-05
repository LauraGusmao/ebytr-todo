import React, { useState } from 'react';

import NavBar from '../../components/NavBar';
import { createTask } from '../../services/apiRequests';
import './style.css';

function CreateTasks() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('');

  const handleCreateTask = async () => {
    await createTask(taskTitle, taskDescription, taskStatus);

    setTaskTitle('');
    setTaskDescription('');
    setTaskStatus('');
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <h3>Create New Task</h3>
        <form>
          <div className="form-group mb-3">
            <label className="label" htmlFor="tasktitle">
              Title:
              <input
                type="text"
                className="form-control"
                id="tasktitle"
                value={ taskTitle }
                onChange={ (event) => setTaskTitle(event.target.value) }
              />
            </label>
          </div>
          <div className="form-group mb-3">
            <label className="label" htmlFor="taskdescript">
              Description:
              <textarea
                type="text"
                className="form-control"
                id="taskdescript"
                value={ taskDescription }
                onChange={ (event) => setTaskDescription(event.target.value) }
              />
            </label>
          </div>
          <div className="form-group mb-3">
            <div className="form-check form-check-inline">
              <label className="form-check-label" htmlFor="statusPending">
                <input
                  className="form-check-input"
                  type="radio"
                  name="statusOptions"
                  id="statusPending"
                  value="Pending"
                  checked={ taskStatus === 'Pending' }
                  onChange={ (event) => setTaskStatus(event.target.value) }
                />
                Pending
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label" htmlFor="statusInProgress">
                <input
                  className="form-check-input"
                  type="radio"
                  name="statusOptions"
                  id="statusInProgress"
                  value="In progress"
                  checked={ taskStatus === 'In progress' }
                  onChange={ (event) => setTaskStatus(event.target.value) }
                />
                In Progress
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label" htmlFor="statusCompleted">
                <input
                  className="form-check-input"
                  type="radio"
                  name="statusOptions"
                  id="statusCompleted"
                  value="Completed"
                  checked={ taskStatus === 'Completed' }
                  onChange={ (event) => setTaskStatus(event.target.value) }
                />
                Completed
              </label>
            </div>
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={ handleCreateTask }
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateTasks;
