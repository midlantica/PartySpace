/*
    This module is responsible for providing the HTML
    representation of the task form 
*/

// Imports
import { saveTask } from "./TaskProvider.js"


// Give variable names to desired targets
const eventHub = document.querySelector(".container")


// Event listener that will save a new object to our database when the save button is heard
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveTask") {

        const taskText = document.querySelector("#taskText").value
        const timeStamp = document.querySelector("#timeStamp").value
        const currentUserId = sessionStorage.getItem('activeUser')

        // Create the format for a new task object
        const newTask = {
            userId: parseInt(currentUserId),
            task: taskText,
            expectDone: timeStamp,
            complete: "false"
        }

        saveTask(newTask)
    }
})


// Event listener that will display the form in the task container when the add button is heard
eventHub.addEventListener("taskFormButtonClicked", customEvent => {
    const taskFormTarget = document.querySelector(".taskFormContainer")
    taskFormTarget.classList.remove("hide")
    
})


// The Task form HTML
export const TaskForm = () => {

    return `
        <section class="taskFormContainer hide">
            <fieldset>
                <label for="taskText">Task:</label>
                <input type="text" id="taskText">
            </fieldset>
            <fieldset>
                <label for="timeStamp">Expected Completion:</label>
                <input type="date" id="timeStamp">
            </fieldset>

            <button id="saveTask">Save Task</button>
        </section>
    `
}

