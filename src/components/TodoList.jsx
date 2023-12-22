import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Loader from './Loader';
import { Context } from '../context/AppContext';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const { loading, setLoading, uId, allTasks, setAllTasks } = useContext(Context);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    const res = await axios.get(`http://localhost:5000/tasks/${uId}`);
    console.log(res.data);
    setTasks(res.data);
    setInitialLoading(false);
  }

  if (initialLoading) {
    return <Loader />;
  }

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const updatedTasks = [...tasks];
    const task = updatedTasks.find(t => t.id === draggableId);
    task.category = destination.droppableId;
    console.log(task.category, destination.droppableId, updatedTasks);
    setTasks(updatedTasks);
  };

  async function handleDelete(id) {
    console.log(id);
    const res = await axios.delete(`http://localhost:5000/tasks/${id}`);
    console.log(res.data);
  }

  function handleUpdate(task) {
    console.log(task);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="todo-list flex flex-col md:flex-row gap-10 container mx-auto p-4">
        <Droppable droppableId="todo">
          {provided => (
            <div className="category bg-blue-700 text-white md:w-1/3 p-4 rounded-sm" {...provided.droppableProps} ref={provided.innerRef}>
              <h2>Todo</h2>
              {tasks
                .filter(task => task.category === 'todo')
                .map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {provided => (
                      <div className="task" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {task.title}{' '}
                        <button className="btn" onClick={() => handleDelete(task.id)}>
                          Delete
                        </button>
                        <button onClick={() => handleUpdate(task)} className="btn ml-2">
                          Button
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="ongoing">
          {provided => (
            <div className="category bg-blue-700 text-white md:w-1/3 p-4 rounded-sm" {...provided.droppableProps} ref={provided.innerRef}>
              <h2>Ongoing</h2>
              {tasks
                .filter(task => task.category === 'ongoing')
                .map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {provided => (
                      <div className="task" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {task.title}{' '}
                        <button className="btn" onClick={() => handleDelete(task.id)}>
                          Delete
                        </button>
                        <button onClick={() => handleUpdate(task)} className="btn ml-2">
                          Button
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="done">
          {provided => (
            <div className="category bg-blue-700 text-white md:w-1/3 p-4 rounded-sm" {...provided.droppableProps} ref={provided.innerRef}>
              <h2>Done</h2>
              {tasks
                .filter(task => task.category === 'done')
                .map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {provided => (
                      <div className="task" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {task.title}{' '}
                        <button className="btn" onClick={() => handleDelete(task.id)}>
                          Delete
                        </button>
                        <button onClick={() => handleUpdate(task)} className="btn ml-2">
                          Button
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default TodoList;
