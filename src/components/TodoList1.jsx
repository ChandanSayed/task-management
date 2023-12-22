import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { Context } from '../context/AppContext';
import axios from 'axios';
import Loader from './Loader';

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds
  };

  return newColumn;
};

export default function TodoList() {
  const { loading, setLoading, tasks, setTasks, uId } = useContext(Context);
  const [allTasks, setAllTasks] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [state, setState] = useState({
    tasks: {},
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'TO-DO',
        taskIds: [1, 2, 3, 4, 5, 6]
      },
      'column-2': {
        id: 'column-2',
        title: 'IN-PROGRESS',
        taskIds: []
      },
      'column-3': {
        id: 'column-3',
        title: 'COMPLETED',
        taskIds: []
      }
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
  });

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    const res = await axios.get(`http://localhost:5000/tasks/${uId}`);
    console.log(res);
    setAllTasks(res.data);
    const tasksIn = res.data.reduce((acc, obj) => {
      acc[obj.id] = obj;
      return acc;
    }, {});
    setState({ ...state, tasks: tasksIn });
    setInitialLoading(false);
  }
  if (initialLoading) {
    return <Loader />;
  }

  const onDragEnd = result => {
    const { destination, source } = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // If the user drops within the same column but in a different positoin
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(sourceCol, source.index, destination.index);

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      };
      setState(newState);
      return;
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div className="flex justify-between gap-12">
          {state.columnOrder.map(columnId => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </div>
      </div>
    </DragDropContext>
  );
}
