/*
    Logout Button
    Creates an HTML logout button with an event listener that removes the user session when clicked,
    clears the dashboard, and broadcasts to the app controller

    Authors: Heidi Sprouse
*/

import { clearDashboard } from "../loadDashboard.js"

const eventHub = document.querySelector(".container")

export const ShowLogoutButton = () => {
    return `<div><button id="logoutButton">Logout</button></div>`
}

eventHub.addEventListener("click", event => {
    if (event.target.id === "logoutButton") {

        //remove the active user session
        sessionStorage.removeItem("activeUser")

        //remove the value of the hidden 

        //clear the dashboard
        clearDashboard()

        //create an event for our app controller to hear
        const logoutButtonClickEvent = new CustomEvent("logoutButtonClicked")
        eventHub.dispatchEvent(logoutButtonClickEvent)
    }
})