/*
    This modle is responsible for pulling 
    together the necessary componets to 
    manage and render the list of tasks 
*/

// Imports
import { deleteTask, useTasks } from "./TaskProvider.js";
import { Task } from "./Task.js";
import { ShowTaskFormButton } from "./ShowTaskFormButton.js";
import { TaskForm } from "./TaskForm.js";

// Assign Variable names to DOM targets
const contentTarget = document.querySelector(".tasks");
const eventHub = document.querySelector(".container");

/* 
    Listen for the delete button to be clicked and send 
    that info to our deleteTask fetch in our provider
*/
contentTarget.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id.startsWith("deleteTask--")) {
    const [prefix, taskId] = clickEvent.target.id.split("--");
    deleteTask(taskId);
  }
})

// Listens for the event we created in TaskProvider and re-renders and updates the task list 
eventHub.addEventListener("taskStateChanged", customEvent => {
    TaskList()
})

// Get all the data and info necessary and collect only the tasks related to the current user
const renderTasks = () => {
    const currentUserId = sessionStorage.getItem('activeUser')
    const allTheTasks = useTasks();

    // Convert the tasks from an aray of objects to an array of strings
    const filteredUserTasks = allTheTasks.filter(userTask => userTask.userId === parseInt(currentUserId));
    return filteredUserTasks.map(task => Task(task)).join("")
}

export const TaskList = () => {
    contentTarget.innerHTML = "<h2>Tasks</h2>"
    contentTarget.innerHTML += TaskForm()
    contentTarget.innerHTML += renderTasks()
    contentTarget.innerHTML += ShowTaskFormButton()
};