// Author: Jayson Rice - This component converts object representations of objects to HTML representations

//HTML representation of a single event 
export const Event = (eventObject, chosenUser) => {
    return `
        <article class="singleEvent ${chosenUser.id}">
        <div class="headflexRow">
            <h2 class="eventName">${eventObject.name}</h2>
            
            <button id="deleteEvent--${eventObject.id}">Delete Event</button>
        </div>
            <section>Date: ${eventObject.date}</section>
            <section>Location: ${eventObject.location}</section>
            <p>Posted By: ${chosenUser.username}</p>
        </article>
            `
        }