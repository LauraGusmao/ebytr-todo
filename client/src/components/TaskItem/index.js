import React from 'react';
import { Link } from 'react-router-dom';

function TaskItem(task) {
  const { task: { title, description, status, date, _id } } = task;
  console.log(task);
  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>{status}</td>
      <td>{date}</td>
      <td><Link to={ `/tasks/edit/${_id}` }>Edit</Link></td>
    </tr>

  );
}

export default TaskItem;
