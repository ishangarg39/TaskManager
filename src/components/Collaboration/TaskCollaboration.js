import React, { useState } from 'react';

export default function TaskCollaboration({ task, onAssign, onComment }) {
  const [assignee, setAssignee] = useState('');
  const [comment, setComment] = useState('');

  const handleAssign = () => {
    onAssign(task.id, assignee);
    setAssignee('');
  };

  const handleComment = () => {
    onComment(task.id, comment);
    setComment('');
  };

  return (
    <div>
      <h2>Task Collaboration</h2>
      <h3>Assign Task</h3>
      <input
        type="text"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      />
      <button type="button" onClick={handleAssign}>
        Assign
      </button>
      <h3>Add Comment</h3>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="button" onClick={handleComment}>
        Comment
      </button>
    </div>
  );
}
