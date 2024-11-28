import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../lib/store';
import TaskList from './TaskList';

export default function InboxScreen() {
  const dispatch = useDispatch();
  const { tasks, error } = useSelector((state) => state.taskBox);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  if (error) {
    return (
      <div className="page list-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <p className="title-message">Oh no!</p>
          <p className="subtitle-message">Something went wrong</p>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="inbox-screen">
      <nav>
        <h1 className="title-page">Inbox</h1>
      </nav>

      <TaskList tasks={tasks} />
    </div>
  );
}
