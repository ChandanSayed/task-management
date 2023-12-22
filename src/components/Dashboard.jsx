import React from 'react';
import TaskForm from './TaskForm';
import TodoList from './TodoList';

const Dashboard = () => {
  return (
    <div>
      <TaskForm />
      <TodoList />
    </div>
  );
};

export default Dashboard;
