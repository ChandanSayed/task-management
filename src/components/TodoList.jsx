import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Loader from './Loader';
import { Context } from '../context/AppContext';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

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

    const today = new Date().toISOString().split('T')[0];

    const objectsWithTodayDate = res.data.filter(list => list.deadline === today);

    console.log(objectsWithTodayDate);

    setTasks(res.data);
    setInitialLoading(false);
  }

  if (initialLoading) {
    return <Loader />;
  }

  const onDragEnd = async result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const updatedTasks = [...tasks];
    const task = updatedTasks.find(t => t._id === draggableId);
    task.category = destination.droppableId;
    console.log(task.category, destination.droppableId, updatedTasks);
    console.log(task);
    const res = await axios.put(`http://localhost:5000/tasks/update-task-category/${task._id}`, { category: task.category });
    console.log(res.data);
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
              <h2 className="text-4xl font-bold text-yellow-400 mb-5">Todo</h2>
              {tasks
                .filter(task => task.category === 'todo')
                .map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {provided => (
                      <div className="task flex gap-2 flex-col md:flex-row items-center justify-between" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div className="flex-1">
                          <p>Task Title</p>
                          <p>{task.title}</p>
                        </div>
                        <div className="flex-1">
                          <p>Due date</p>
                          <p>{task.deadline}</p>
                        </div>
                        <button className="btn p-2 h-auto min-h-min" onClick={() => handleDelete(task._id)}>
                          <FaRegEdit />
                        </button>
                        <button onClick={() => handleUpdate(task)} className="btn ml-2 p-2 min-h-min h-auto">
                          <MdDeleteForever />
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
              <h2 className="text-4xl font-bold text-yellow-400 mb-5">Ongoing</h2>
              {tasks
                .filter(task => task.category === 'ongoing')
                .map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {provided => (
                      <div className="task flex gap-2 flex-col md:flex-row items-center justify-between" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div className="flex-1">
                          <p>Task Title</p>
                          <p>{task.title}</p>
                        </div>
                        <div className="flex-1">
                          <p>Due date</p>
                          <p>{task.deadline}</p>
                        </div>
                        <button className="btn p-2 h-auto min-h-min" onClick={() => handleDelete(task._id)}>
                          <FaRegEdit />
                        </button>
                        <button onClick={() => handleUpdate(task)} className="btn ml-2 p-2 min-h-min h-auto">
                          <MdDeleteForever />
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
              <h2 className="text-4xl font-bold text-yellow-400 mb-5">Done</h2>
              {tasks
                .filter(task => task.category === 'done')
                .map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {provided => (
                      <div className="task flex gap-2 flex-col md:flex-row items-center justify-between" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div className="flex-1">
                          <p>Task Title</p>
                          <p>{task.title}</p>
                        </div>
                        <div className="flex-1">
                          <p>Due date</p>
                          <p>{task.deadline}</p>
                        </div>
                        <button className="btn p-2 h-auto min-h-min" onClick={() => handleDelete(task._id)}>
                          <FaRegEdit />
                        </button>
                        <button onClick={() => handleUpdate(task)} className="btn ml-2 p-2 min-h-min h-auto">
                          <MdDeleteForever />
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
