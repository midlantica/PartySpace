/*
    Add New Friend
    Listens for an add new friend event, when triggered check to make sure that user exists, that they aren't already friends,
    that they aren't trying to add themselves as a friend, and if everything checks out, add friend relationship to database.json

    Authors: Heidi Sprouse
*/

import { useUsers } from "../users/userProvider.js"
import { saveFriend } from "./friendProvider.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("AddNewFriend", event => {
    //friend name sent by the event
    const friendName = event.detail.friendName

    const currentUserId = sessionStorage.getItem('activeUser')
    const users = useUsers()
    const currentUserInfo = users.find(user => user.id === parseInt(currentUserId))
    const friends = currentUserInfo.friends

    const friendInfo = users.find(user => user.username === friendName)

    let errorTrigger = false

    /*ERROR HANDLING*/

    //make sure user put in a username
    if (friendName === "") {
        alert('You didn\'t input the username of the person you want to be friends with.')
        errorTrigger = true
    } else {
        //check to make sure user exists
        if (friendInfo === undefined) {
            alert('This user does not exist! Please try again.')
            errorTrigger = true
        } else {

            //check to make sure that user isn't trying to add themselves as a friend
            if (friendInfo.id === parseInt(currentUserId)) {
                alert('While it is always good to be a friend to yourself, you cannot add yourself as a friend through this particular dashboard. :-)')
                errorTrigger = true
            }

            //make sure that they aren't already friends
            if (friends.some(friend => friend.following === friendInfo.id)) {
                alert(`You are already friends with ${friendInfo.username}!`)
                errorTrigger = true
            }
        }
    }

    //if no errors were thrown, proceed with the friendship creation
    if (errorTrigger === false) {

        //show a confirmation pop up before the friend is actually saved
        if (window.confirm(`Would you like to add ${friendName} as a friend?`)) {
            //object to send to the save function
            const newFriend = {
                userId: parseInt(currentUserId),
                following: parseInt(friendInfo.id)
            }

            saveFriend(newFriend)
        } else {
            //clear out data in the friend form if they click cancel
            document.querySelector("#newFriendName").value = ''
        }

    }
})