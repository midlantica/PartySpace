/*
    This module is responsible for providing and exporting 
    the HTML representation of a single task.
*/

// HTML of a task
export const Task = (taskObject) => {
    return `
        <section>
            <h3>${taskObject.task}</h3>
            <p>Expected Completion: ${taskObject.expectDone}</p>
            <p>Completed: ${taskObject.complete}</p>
            <p>
                <button id="deleteTask--${taskObject.id}">❌</button>
            </p>
        </section>
    `
}