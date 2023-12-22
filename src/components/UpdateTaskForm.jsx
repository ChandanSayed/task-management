import React, { useContext } from 'react';
import { Context } from '../context/AppContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateTaskForm = ({ updateInfo, setUpdateInfo, openPop, setOpenPop, setUpdateTaskList }) => {
  const { loading, setLoading, tasks, setTasks, uId } = useContext(Context);
  const {
    register,
    trigger,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  async function onSubmit(data) {
    const isValid = await trigger();
    const { deadline, description, priority, title } = data;
    if (isValid) {
      const res = await axios.put(`/tasks/update-task/${updateInfo._id}`, { deadline, description, priority, title });
      if (res.data) {
        setUpdateInfo({});
        setOpenPop(false);
        setUpdateTaskList(prev => prev + 1);
        Swal.fire({
          title: 'Congrats!',
          text: `Your task Successfully updated!`,
          icon: 'success'
        });
        reset();
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto shadow-xl p-6 rounded-lg bg-white w-full">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input placeholder={updateInfo.title} {...register('title', { required: 'Title is required' })} id="title" type="text" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea placeholder={updateInfo.description} {...register('description', { required: 'Description is required' })} id="description" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="deadline" className="block text-gray-700 font-bold mb-2">
          Deadline
        </label>
        <input placeholder={updateInfo.deadline} {...register('deadline', { required: 'Deadline is required' })} id="deadline" type="date" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
        {errors.deadline && <span className="text-red-500 text-sm">{errors.deadline.message}</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="priority" className="block text-gray-700 font-bold mb-2">
          Priority
        </label>
        <select {...register('priority', { required: 'Priority is required' })} id="priority" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
        {errors.priority && <span className="text-red-500 text-sm">{errors.priority.message}</span>}
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Update Task
      </button>
    </form>
  );
};

export default UpdateTaskForm;
