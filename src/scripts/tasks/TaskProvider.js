/*
    This module is responsible for the managment of the task data.
    It will retreive it, save it, and delete it and provide a
    state change event that when heard will re-render the task 
    list to show the most recent updates to it.
*/


// Set a target in our HTML file equal to eventHub to be used by our events
const eventHub = document.querySelector(".container")


// Provides an event that will dispatch that the task list state has changed
const dispatchStateChangeEvent = () => {
    const taskStateChangedEvent = new CustomEvent("taskStateChanged")

    eventHub.dispatchEvent(taskStateChangedEvent)
}


// Makes the notes equal to an empty array that can be filled by our server requests
let tasks = []


// Creates a copy of our data
export const useTasks = () => tasks.slice()


// Gets the data from the database
export const getTasks = () => {
    return fetch('http://localhost:8088/tasks')
        .then(response => response.json())
        .then(parsedTasks => {
            tasks = parsedTasks
        })

}

// Saves a new task from the database when triggered
export const saveTask = task => {
    return fetch('http://localhost:8088/tasks', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
    .then(getTasks)
    .then(dispatchStateChangeEvent)
}

// Deletes a task from the database when triggered
export const deleteTask = taskId => {
    return fetch(`http://localhost:8088/tasks/${taskId}`, {
        method: "DELETE"
    })
        .then(getTasks)
        .then(dispatchStateChangeEvent)
}