import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Loader from "./Loader";
import { Context } from "../context/AppContext";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import UpdateTaskForm from "./UpdateTaskForm";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const {
    loading,
    setLoading,
    uId,
    allTasks,
    setAllTasks,
    updateTaskList,
    setUpdateTaskList,
  } = useContext(Context);
  const [openPop, setOpenPop] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({});
  const boards = [
    { id: 1, title: "To Do", category: "todo" },
    { id: 2, title: "In Progress", category: "ongoing" },
    { id: 3, title: "Done", category: "done" },
  ];

  useEffect(() => {
    getTasksInitially();
  }, []);

  useEffect(() => {
    getTasks();
  }, [updateTaskList]);

  async function getTasksInitially() {
    const res = await axios.get(`/tasks/${uId}`);

    setTasks(res.data);
    setInitialLoading(false);

    // const today = new Date().toISOString().split('T')[0]; international format
    const today = new Date();
    const formattedDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      today.getDate().toString().padStart(2, "0");
    const withTodayDate = await res.data.filter(
      (list) => list.deadline === formattedDate
    );
    const deadlineToday = withTodayDate.filter(
      (item) => item.category !== "done"
    );

    if (deadlineToday.length > 0) {
      console.log("You have some tasks to complete today");
      Swal.fire({
        title: "Remember!",
        text: `You have ${deadlineToday.length} tasks to complete today!`,
        icon: "info",
      });
    }
    if (res.data.length < 1) {
      Swal.fire({
        title: "Remember!",
        text: `You haven't added any task, why not today!`,
        icon: "info",
      });
    }
  }
  async function getTasks() {
    const res = await axios.get(`/tasks/${uId}`);

    setTasks(res.data);
    setInitialLoading(false);
  }

  if (initialLoading) {
    return <Loader />;
  }

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedTasks = [...tasks];
    const task = updatedTasks.find((t) => t._id === draggableId);
    task.category = destination.droppableId;
    const res = await axios.put(`/tasks/update-task-category/${task._id}`, {
      category: task.category,
    });

    if (res.data) {
      setTasks(updatedTasks);
    }
  };

  async function handleDelete(id) {
    console.log(id);
    const res = await axios.delete(`/tasks/${id}`);
    // console.log(res.data);
    if (res.data.deletedCount) {
      Swal.fire({
        title: "Congrats!",
        text: `Your task Successfully deleted!`,
        icon: "success",
      });
      setUpdateTaskList((prev) => prev + 1);
    }
  }

  function handleUpdate(task) {
    setUpdateInfo(task);
    setOpenPop(true);
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          className="todo-list flex flex-col md:flex-row gap-10 container mx-auto p-4"
        >
          {boards.map((board) => {
            return (
              <DropComponent
                board={board}
                tasks={tasks}
                key={board.id}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            );
          })}
        </motion.div>
      </DragDropContext>
      <div
        className={`h-screen flex flex-col items-center justify-center fixed inset-0 bg-black bg-opacity-90 ${
          openPop ? "block" : "hidden"
        }`}
      >
        <UpdateTaskForm
          setUpdateTaskList={setUpdateTaskList}
          updateInfo={updateInfo}
          setUpdateInfo={setUpdateInfo}
          openPop={openPop}
          setOpenPop={setOpenPop}
        />
      </div>
    </>
  );
};

export default TodoList;

function DropComponent({ board, tasks, handleUpdate, handleDelete }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }
  return (
    <Droppable droppableId={board.category}>
      {(provided) => (
        <div
          className="category bg-blue-700 text-white md:w-1/3 p-4 rounded-sm"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h2 className="text-4xl font-bold text-yellow-400 mb-5">
            {board.title}
          </h2>
          {tasks
            .filter((task) => task.category === board.category)
            .map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided) => (
                  <div
                    className="task mb-4"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <div className="flex gap-2 flex-row items-center justify-between">
                      <div className="flex-1">
                        <p>Task Title</p>
                        <p>{task.title}</p>
                      </div>
                      <div className="flex-1">
                        <p>Due date</p>
                        <p>{task.deadline}</p>
                      </div>
                      <button
                        onClick={() => handleUpdate(task)}
                        className="btn ml-2 p-2 min-h-min h-auto"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        className="btn p-2 h-auto min-h-min"
                        onClick={() => handleDelete(task._id)}
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                    <div>
                      <p>Task Description</p>
                      <p>{task.description}</p>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
