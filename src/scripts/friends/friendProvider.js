/*
    Friend Data Provider
    Functions that deal with the adding and deleting of friends

    Authors: Heidi Sprouse
*/

import { getUsers } from "../users/userProvider.js"

const eventHub = document.querySelector(".container")

//this function creates a custom event that should be triggered when a friend has been added or deleted
const dispatchStateChangeEvent = () => {
    const friendStateChangedEvent = new CustomEvent("friendStateChanged")

    eventHub.dispatchEvent(friendStateChangedEvent)
}

//add a new friend
export const saveFriend = friend => {
    return fetch('http://localhost:8088/friends', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friend)
        })
        .then(getUsers)
        .then(dispatchStateChangeEvent)
}

//deletes a friend :(
export const deleteFriend = friendId => {
    return fetch(`http://localhost:8088/friends/${friendId}`, {
            method: "DELETE"
        })
        .then(getUsers)
        .then(dispatchStateChangeEvent)
}