/*
    Add New Friend Form
    HTML form that allows a user to add a new friend by typing in their name

    Authors: Heidi Sprouse
*/

import { useUsers } from "../users/userProvider.js"

const eventHub = document.querySelector(".container")

export const ShowAddFriendForm = () => {
        const currentUserId = sessionStorage.getItem('activeUser')
        let users = useUsers()

        const currentUserInfo = users.find(user => user.id === parseInt(currentUserId))
        const friends = currentUserInfo.friends

        //filter out users that current user is already friends with
        users = users.filter(user => {
            if (friends.some(friend => user.id === friend.following)) {
                return false
            }
            return true
        })

        return `
            <div id="friendForm">
            <input id="newFriendName" list="friendDatalist">
                <datalist id="friendDatalist">
                ${users.map(user => {
                    //map through all the users to create a datalist form element
                    if (user.id !== parseInt(currentUserId)) {
                        return `<option value="${user.username}">`
                    }
                }).join('')}
            </datalist>
            <button id="AddFriendButton">Add</button>
            </div>
    `
}

eventHub.addEventListener("click", event => {
    if (event.target.id === "AddFriendButton") {
        const addNewFriendEvent = new CustomEvent("AddNewFriend", {
            detail: {
                friendName: document.querySelector("#newFriendName").value
            }
        })

        eventHub.dispatchEvent(addNewFriendEvent)
    }
})