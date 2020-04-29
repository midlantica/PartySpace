// Drew Harper
// Handles creation of News, displaying of News, deleting of News

import { News } from './News.js'
import { NewsForm } from './NewsForm.js'
import { deleteNews, useNews } from './newsProvider.js'

const eventHub = document.querySelector('.container')
const contentTarget = document.querySelector('.news')

eventHub.addEventListener('newsStateChanged', (customEvent) => {
  NewsList()
})

contentTarget.addEventListener('click', (clickEvent) => {
  if (clickEvent.target.id === 'plusBtn') {
    // console.log('yeah')
    NewsForm()
    const contentTarget = document.querySelector('.newsForm')
    contentTarget.classList.remove('hide')
  }
})

const render = (newsToRender) => {
  return newsToRender
    .map((newsObject) => {
      return News(newsObject)
    })
    .join('')
}
export const NewsList = () => {
  // .news is wrap div
  contentTarget.innerHTML = `
    <div class="headflexRow">
      <h2>News</h2>
      <button id="plusBtn">+</button>
    </div>
  `
  const news = useNews()

  const currentUserId = sessionStorage.getItem('activeUser')

  const filteredUserNews = news.filter(
    (userNews) => userNews.userId === parseInt(currentUserId)
  )

  contentTarget.innerHTML += `
    <div class="newsForm"></div>
    <div class="newsList">${render(filteredUserNews)}</div>
  `
}

// Listens for the delete event button click
contentTarget.addEventListener('click', (clickEvent) => {
  if (clickEvent.target.id.startsWith('deleteEvent--')) {
    const [_, newsId] = clickEvent.target.id.split('--')
    deleteNews(newsId)
  }
})
