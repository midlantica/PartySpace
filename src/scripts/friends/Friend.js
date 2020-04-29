/*
    Friend HTML
    Creates an HTML representation of a single friend

    Authors: Heidi Sprouse
*/

import { useUsers } from '../users/userProvider.js'
import { deleteFriend } from './friendProvider.js'

const eventHub = document.querySelector('.container')

export const Friend = (friendObject) => {
  return `
    <div class="friend box padH">
        <h3>${friendObject.username}</h3>
        <button id="deleteFriend--${friendObject.id}">X</button>
    </div>`
}

eventHub.addEventListener('click', (event) => {
  if (event.target.id.startsWith('deleteFriend--')) {
    if (window.confirm(`Are you sure you want to remove this friend?`)) {
      const currentUserId = sessionStorage.getItem('activeUser')
      const users = useUsers()

      const currentUserInfo = users.find(
        (user) => user.id === parseInt(currentUserId)
      )
      const friends = currentUserInfo.friends

      const [prefix, deleteFriendId] = event.target.id.split('--')

      //get the friend relationship id of the friend we want to delete
      const foundFriend = friends.find(
        (friend) => friend.following === parseInt(deleteFriendId)
      )

      deleteFriend(foundFriend.id)
    }
  }
})
