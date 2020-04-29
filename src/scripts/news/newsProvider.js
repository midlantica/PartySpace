// Drew Harper
// database for news
// { useNews, getNews,saveNews, deleteNews }

let news = []

const eventHub = document.querySelector('.container')

const dispatchStateChangeEvent = () => {
  const newsStateChangedEvent = new CustomEvent('newsStateChanged')

  eventHub.dispatchEvent(newsStateChangedEvent)
}

export const useNews = () =>
  news.sort((c, n) => n.timestamp - c.timestamp).slice()

export const getNews = () => {
  return fetch('http://localhost:8088/news')
    .then((response) => response.json())
    .then((parsedNews) => {
      news = parsedNews
    })
}

export const saveNews = (news) => {
  return fetch('http://localhost:8088/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(news),
  })
    .then(getNews)
    .then(dispatchStateChangeEvent)
}

export const deleteNews = (newsId) => {
  return fetch(`http://localhost:8088/news/${newsId}`, {
    method: 'DELETE',
  })
    .then(getNews)
    .then(dispatchStateChangeEvent)
}
