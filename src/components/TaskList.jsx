import Task from './Task';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { pinTask, archiveTask } from '../lib/store';

export default function TaskList() {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => {
    const { tasks } = state.taskBox;

    const tasksInOrder = [
      ...tasks.filter((t) => t.state === 'TASK_PINNED'),
      ...tasks.filter((t) => t.state === 'TASK_INBOX'),
      ...tasks.filter((t) => t.state === 'TASK_ARCHIVED'),
    ];

    return tasksInOrder;
  });
  const { status } = useSelector((state) => state.taskBox);

  const onPinTask = (id) => {
    dispatch(pinTask({ id }));
  };

  const onArchiveTask = (id) => {
    dispatch(archiveTask({ id }));
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (status === 'loading') {
    return (
      <div className="list-items" data-testid="loading" key="loading">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items" key="empty" data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">No tasks found</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={onPinTask}
          onArchiveTask={onArchiveTask}
        />
      ))}
    </div>
  );
}

TaskList.propTypes = {
  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  onPinTask: PropTypes.func,
  onArchiveTask: PropTypes.func,
};
