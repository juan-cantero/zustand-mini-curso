import { StateCreator, create } from "zustand";
import { Task, TaskStatus } from "../../models";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { immer } from "zustand/middleware/immer";

interface TaskState {
  tasks: Record<string, Task>; // {[id: string]: Task};
  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;
  setDraggingTaskId: (taskId: string) => void;
  draggingTaskId?: string;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<
  TaskState,
  [
    ["zustand/devtools", never],
    ["zustand/immer", never],
    ["zustand/persist", unknown]
  ]
> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    abc1: {
      id: "abc1",
      title: "Task 1",
      status: "in-progress",
    },
    abc2: {
      id: "abc2",
      title: "Task 2",
      status: "pending",
    },
    abc3: {
      id: "abc3",
      title: "Task 3",
      status: "pending",
    },
  },
  setDraggingTaskId: (taskId) => set({ draggingTaskId: taskId }),
  removeDraggingTaskId: () => {
    set((state) => {
      console.log(state);
      return {
        draggingTaskId: undefined,
      };
    });
  },
  getTaskByStatus: (status) => {
    return Object.values(get().tasks).filter((task) => task.status === status);
  },
  //?requiere immer
  addTask: (title, status) => {
    const newTask = { id: uuidv4(), title, status };

    set((state) => {
      state.tasks[newTask.id] = newTask;
    });
  },

  //?Forma nativa
  // addTask: (title, status) => {
  //   const id = uuidv4();
  //   set((state) => ({
  //     tasks: {
  //       ...state.tasks,
  //       [id]: {
  //         id,
  //         title,
  //         status,
  //       },
  //     },
  //   }));
  //},
  changeTaskStatus: (taskId, status) => {
    set((state) => {
      state.tasks[taskId] = { ...state.tasks[taskId], status };
    });
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;
    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(immer(persist(storeApi, { name: "task-storage" })))
);
