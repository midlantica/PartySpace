// Drew Harper
// HTML Representation for News article

import { useUsers } from '../users/userProvider.js'
// let date = new Date(UNIX_Timestamp * 1000)
export const News = (newsObj) => {
  const users = useUsers()

  //get current user's info
  const author = users.find((user) => user.id === parseInt(newsObj.userId))

  return `
    <article class="box">
      <button id="deleteEvent--${newsObj.id}" class="xOut">X</button>
      <h4><a href="${newsObj.url}" target="_blank">${newsObj.title}</a></h4>
      <p>${newsObj.synopsis}</p>
      <p>Posted by: ${author.username}</p>
      <p class="timestamp">${new Date(
        newsObj.timestamp
      ).toLocaleDateString()}</p>
    </article>
  `
}
