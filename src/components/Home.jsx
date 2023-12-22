import React from 'react';
import TaskForm from './TaskForm';
import ToDoList from './TodoList';

const Home = () => {
  return (
    <>
      <TaskForm />
      <ToDoList />
    </>
  );
};

export default Home;
