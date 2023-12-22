import TaskForm from './TaskForm';
import TodoList from './TodoList';
import { useState } from 'react';

const Dashboard = () => {
  const [showTab, setShowTab] = useState(0);
  const [loading, setLoading] = useState(true);
  function tabChange(index) {
    setShowTab(index);
  }
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="bg-gray-800 text-white md:w-1/5">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Dashboard</h1>
          <ul>
            <li>
              <button to="/add-task" onClick={() => tabChange(1)}>
                Add Task
              </button>
            </li>
            <li>
              <button to="/task-list" onClick={() => tabChange(2)}>
                Task List
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 p-10">
        <>
          <div className={`w-full ${showTab == 1 ? 'block' : 'hidden'}`}>
            <TaskForm />
          </div>
          <div className={`w-full ${showTab == 2 ? 'block' : 'hidden'}`}>
            <TodoList />
          </div>
        </>
      </div>
    </div>
  );
};

export default Dashboard;
