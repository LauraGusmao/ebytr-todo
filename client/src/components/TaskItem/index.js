import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';

function TaskItem(task) {
  const { task: { title, description, status, date, _id } } = task;

  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>{status}</td>
      <td>{date}</td>
      <td>
        <Link to={ `/tasks/edit/${_id}` }><AiFillEdit /></Link>
      </td>
    </tr>

  );
}

export default TaskItem;
