import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import NavBar from '../../components/NavBar';
import { findTaskById, updateTask } from '../../services/apiRequests';

function EditTasks(props) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStatus, setTaskStatus] = useState('');

  useEffect(() => {
    const { match: { params: { id } } } = props;

    const getTask = async () => {
      const data = await findTaskById(id);
      setTaskTitle(data.title);
      setTaskDescription(data.description);
      setTaskStatus(data.status);
    };
    getTask();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditTask = async () => {
    const { match: { params: { id } } } = props;

    await updateTask(id, taskTitle, taskDescription, taskStatus);

    props.history.push('/tasks');
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <h3>Edit Task</h3>
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
              onClick={ handleEditTask }
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

EditTasks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default EditTasks;
