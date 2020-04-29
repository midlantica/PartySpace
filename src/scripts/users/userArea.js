/*
    User Area
    Fills in the leftmost column on the dashboard with the user's information and friend data

    Authors: Heidi Sprouse
*/

import { useUsers } from "./userProvider.js"
import { ShowLogoutButton } from "../userAuth/LogoutButton.js"
import { ShowFriendList } from "../friends/FriendList.js"
import { ShowAddFriendForm } from "../friends/AddNewFriendForm.js"

const contentTarget = document.querySelector(".user")

export const userArea = () => {

    const users = useUsers()
    const currentUserId = sessionStorage.getItem('activeUser')

    //get current user's info
    const currentUserInfo = users.find(user => user.id === parseInt(currentUserId))

    contentTarget.innerHTML = `
    <div>
    <h2>Welcome, ${currentUserInfo.username}!</h2>
    ${ShowLogoutButton()}
    </div>
    <div id="friendsContainer">
        <div id="friendList">
            <h2>My Friends</h2>
            ${ShowFriendList()}
        </div>
        <hr />
        <div id="friendForm">
            <h2>Add New Friend</h2>
            ${ShowAddFriendForm()}
        </div>
    </div>`
}