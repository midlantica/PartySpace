/*
    Dashboard Loader
    Controls loading the dashboard components when the user logs in,
    Needed a function that loads all the components that will need the user session

    Authors: Heidi Sprouse
*/
import { ChatList } from './chat/ChatList.js'
import { EventList } from './events/EventList.js'
import { NewsList } from './news/NewsList.js'
import { TaskList } from './tasks/TaskList.js'
import { userArea } from './users/userArea.js'

const eventHub = document.querySelector('.container')

//add all functions to load theh components here
export const loadDashboard = () => {
  userArea(), EventList(), TaskList(), ChatList(), NewsList()
}

//clears the dashboard to prevent conflicts
export const clearDashboard = () => {
  const clearTargets = [
    '.user', //
    '.news',
    '.events',
    '.tasks',
    '.chat',
  ]

  clearTargets.forEach(
    (component) => (document.querySelector(component).innerHTML = '')
  )
}

//when a friend is added or deleted, reload all the components
eventHub.addEventListener('friendStateChanged', (event) => {
  clearDashboard()
  loadDashboard()
})
