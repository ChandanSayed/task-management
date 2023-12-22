import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialTasks = [
  { id: 'task1', content: 'Complete project proposal', category: 'ongoing' },
  { id: 'task2', content: 'Read chapters 5-7 of "The Great Gatsby"', category: 'ongoing' },
  { id: 'task3', content: 'Prepare presentation slides for meeting', category: 'ongoing' },
  { id: 'task4', content: 'Research new marketing strategies', category: 'ongoing' },
  { id: 'task5', content: 'Finish report for Q4 sales', category: 'done' },
  { id: 'task6', content: 'Call Sarah regarding upcoming event', category: 'done' },
  { id: 'task6', content: 'Call Sarah regarding upcoming event', category: 'todo' }
];

const TodoList = () => {
  const [tasks, setTasks] = useState(initialTasks);

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

    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="todo-list flex flex-col md:flex-row gap-10 container mx-auto p-4">
        <Droppable droppableId="ongoing">
          {provided => (
            <div className="category bg-blue-700 text-white md:w-1/3 p-4 rounded-sm" {...provided.droppableProps} ref={provided.innerRef}>
              <h2>Todo</h2>
              {tasks
                .filter(task => task.category === 'todo')
                .map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {provided => (
                      <div className="task" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {task.content}
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
                .filter(task => task.category === 'done')
                .map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {provided => (
                      <div className="task" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {task.content}
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
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {provided => (
                      <div className="task" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {task.content}
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
