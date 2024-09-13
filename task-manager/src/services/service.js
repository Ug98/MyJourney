import { db } from '../firebase.config'; 
import { ref, onValue, push, update, remove } from 'firebase/database';

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

export const deleteTask = (taskId) =>{
  const taskRef = ref(db, `tasks/${taskId}`);
return remove(taskRef);
}

export const updateTaskText = (taskId, newText) => {
  const taskRef = ref(db, `tasks/${taskId}`);
  return update(taskRef, { text: newText });
};