import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../models";

interface Options {
    status: TaskStatus;
}

export const useTasks = ({ status }: Options ) => {

   const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);

  const [onDragOver,setOnDragOver] = useState(false);

  const handleAddTask = async () => {
    const {isConfirmed,value} = await Swal.fire({
      title: 'Task Name',
      input: 'text',
      inputLabel: 'Task Name',
      inputPlaceholder: 'Enter task name',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    })
    
    if (!isConfirmed) return ;

    addTask(value, status);
    
  }



  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setOnDragOver(true);
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    onTaskDrop(status);
    setOnDragOver(false);
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setOnDragOver(false);
  }

  return {
    //props
    isDragging,

    //methods
    onDragOver,
    handleAddTask,
    handleDragOver,
    handleDrop,
    handleDragLeave
  }
}