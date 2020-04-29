/*  Author: Jayson Rice - This component displays the list of events and also 
    holds the button to open the event form. It also handles event listeners for the events
*/
import { Event } from "./Event.js";
import { useEvents, deleteEvent } from "./eventProvider.js";
import { EventForm } from "./EventForm.js";
import { useUsers } from "../users/userProvider.js";
import { getFriendIdArray } from "../friends/getCurrentFriends.js";

const contentTarget = document.querySelector(".events")
const eventHub = document.querySelector(".container")

const render = (eventsToRender) => {

    return eventsToRender
        .map((eventObject) => {

            const userArray = useUsers()
            const chosenUser = userArray.find(
                user => user.id === eventObject.userId)

            return Event(eventObject, chosenUser)
        })
        .join('')
}

// Responsible for rendering the event list
export const EventList = () => {
    contentTarget.innerHTML = `
    <div class="headflexRow">
    <h2 class="eventsTitle">Upcoming Events</h2>
    <button type="button" id='showEventForm' class="plusBtn">+</button>
    </div>
`
    let userAndFriendEventArray = []

    const allTheEvents = useEvents()
    const allFriendIds = getFriendIdArray() 

    const currentUserId = sessionStorage.getItem('activeUser')
    const filteredUserEvents = allTheEvents.filter(userEvent => userEvent.userId === parseInt(currentUserId));

    allFriendIds.forEach(singleId => {
    const filteredFriendEvents =  allTheEvents.filter(userEvent => userEvent.userId === parseInt(singleId));
    userAndFriendEventArray = userAndFriendEventArray.concat(filteredFriendEvents)
    });

    // Puts a sorted array of the event data from the user and their friends
    userAndFriendEventArray = userAndFriendEventArray.concat(filteredUserEvents).sort
        ((Beginning, End) => {

            let [month1, day1, year1] = Beginning.date.split("-")
            let [month2, day2, year2] = End.date.split("-")

            if (year1 + month1 + day1 < year2 + month2 + day2) {
                return -1
            }
            if (year1 + month1 + day1 > year2 + month2 + day2) {
                return 1
            }
            return 0
        }
        )

    EventForm()
    contentTarget.innerHTML += `<div class="eventList"> ${render(userAndFriendEventArray)}</div>`

}

// If the event data is changed, re-render the new data and the surrounding divs
eventHub.addEventListener("eventStateChanged", CustomEvent => {
    EventList()
})

// Tells other components when the event form button is clicked
contentTarget.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "showEventForm") {
        const customEvent = new CustomEvent("eventFormButtonClicked")
        eventHub.dispatchEvent(customEvent)
    }
})

// Listens for the delete event button click
contentTarget.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteEvent--")) {
        const [_, eventId] = clickEvent.target.id.split("--")
        deleteEvent(eventId)
    }
})