// Drew Harper
// News Form for submitting a News article
// Contains eventListener for Submitting News form
// Renders form
// eventHandler xOut for closing News Form

import { saveNews } from './newsProvider.js'

const eventHub = document.querySelector('.container')
const contentTarget = document.querySelector('.newsForm')

// Handle browser-generated click event in component
eventHub.addEventListener('click', (clickEvent) => {
  if (clickEvent.target.id === 'saveNews') {
    const title = document.querySelector('#title').value
    const synopsis = document.querySelector('#synopsis').value
    const url = document.querySelector('#url').value
    const timestamp = document.querySelector('#timestamp').value
    const userId = sessionStorage.getItem('activeUser')

    // Make a new object representation of a news
    const newNews = {
      title: title,
      synopsis: synopsis,
      url: url,
      timestamp: Date.now(),
      userId: parseInt(userId),
    }

    // Change API state and application state
    saveNews(newNews)
    contentTarget.classList.add('hide')
  }
})

const render = () => {
  const contentTarget = document.querySelector('.newsForm')

  return `
    <div class="formWrap">
      <div class="dh-Form panel fadeBackground marB1">

        <div id="xOut" class="xOut">X</div>

        <label for="title">Title</label>
        <input type="text" id="title">

        <label for="synopsis">Synopsis</label>
        <textarea type="text" id="synopsis" rows=3></textarea>

        <label for="url">Url</label>
        <input type="text" id="url">

        <input type="hidden" id="timestamp" value="">

        <button id="saveNews" class="btnSmall marT2">Add News</button>
      </div>
    </div>
  `
}

eventHub.addEventListener('click', (clickEvent) => {
  if (clickEvent.target.id === 'xOut') {
    const contentTarget = document.querySelector('.newsForm')
    contentTarget.classList.add('hide')
  }
})

export const NewsForm = () => {
  const contentTarget = document.querySelector('.newsForm')

  contentTarget.innerHTML = render()
}
