import { db } from '../firebase.config'; 
import { ref, onValue, push, update } from 'firebase/database';

export const getTasks = (callback) => {
  const tasksRef = ref(db, 'tasks');
  onValue(tasksRef, (snapshot) => {
    const data = snapshot.val();
    const tasksList = [];
    if (data) {
      for (let id in data) {
        tasksList.push({ id, ...data[id] });
      }
    }
    callback(tasksList);
  });
};

export const addTask = (task) => {
  const tasksRef = ref(db, 'tasks');
  push(tasksRef, task);
};

export const updateTaskStatus = (taskId, completed) => {
  const taskRef = ref(db, `tasks/${taskId}`);
  update(taskRef, { completed });
};
