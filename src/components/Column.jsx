import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ column, tasks }) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <p className="text-lg">{column.title}</p>
      </div>

      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <div className="flex flex-col" ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div className="flex cursor-grab p-4" ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
                    <p>{task.content}</p>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
