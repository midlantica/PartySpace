/*
    Login User Functions
    These functions check to see if a user's info is valid, and if so logs them in when the login button is clicked

    Authors: Heidi Sprouse
*/

import { useUsers } from "../users/userProvider.js"
import { loadDashboard, clearDashboard } from "../loadDashboard.js"

const eventHub = document.querySelector(".container")

//check to see if a user's name and password match
const CheckUserPassValid = (username, password) => {
    const users = useUsers()

    const foundUser = users.find(user => user.username === username)

    //no users with this username
    if (foundUser === undefined) {

        return false
    }

    //check to see if password is valid
    if (foundUser.password !== password) {

        return false
    }

    return foundUser.id
}

//Set the session and login the user
eventHub.addEventListener("loginButtonClicked", event => {

    const username = event.detail.username
    const password = event.detail.password

    const userId = CheckUserPassValid(username, password)

    //clear out the login form
    document.querySelector("#login__username").value = ''
    document.querySelector("#login__password").value = ''

    if (userId !== false) {

        const userLoggedInEvent = new CustomEvent("userWasLoggedIn")
        eventHub.dispatchEvent(userLoggedInEvent)

        //set the local session to the user's ID
        sessionStorage.setItem("activeUser", userId)

        //load the dashboard for the user
        loadDashboard(userId)

    } else {
        alert('Login cannot be completed')
    }
})