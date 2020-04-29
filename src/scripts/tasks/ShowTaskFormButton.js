/*
    This module is responsible for providing the Add 
    Task Button and adding an event listener to it
*/

// Give variable names to desired targets
const contentTarget = document.querySelector(".tasks")
const eventHub = document.querySelector(".container")


// This is the function that provides an HTML representation of a Add Task button
export const ShowTaskFormButton = () => {
    return `<button id="addTask">Add Task</button>`
}


// This is the event listener that will dispatch that the button was clicked
contentTarget.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "addTask") {
        //Create a custom event to tell any interested component that the user wants to see notes
        const customEvent = new CustomEvent("taskFormButtonClicked")
        //Dispatch it to event hub
        eventHub.dispatchEvent(customEvent)
    }
})