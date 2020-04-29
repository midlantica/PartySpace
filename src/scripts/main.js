import { pageStateChanged } from './appController.js'
import './chat/ChatList.js'
import { getChats } from './chat/chatProvider.js'
import { getEvents } from './events/eventProvider.js'
import './friends/addNewFriend.js'
import { loadDashboard } from './loadDashboard.js'
import './news/NewsList.js'
import { getNews } from './news/newsProvider.js'
import { getTasks } from './tasks/TaskProvider.js'
import { ShowLoginForm } from './userAuth/LoginForm.js'
import './userAuth/loginUser.js'
import { ShowRegisterForm } from './userAuth/RegisterForm.js'
import './userAuth/registerUser.js'
import { getUsers } from './users/userProvider.js'

//get the current user from session storage
const currentUserId = sessionStorage.getItem('activeUser')

//set the initial page state
pageStateChanged()

//array of all "get" fetch calls
const promises = [getUsers(), getEvents(), getNews(), getChats(), getTasks()]

Promise.all(promises).then(() => {
  ShowLoginForm()
  ShowRegisterForm()
  //if the user is already logged in, go ahead and load the dashboard components and set the hidden input to the current user's ID
  if (currentUserId !== null) {
    loadDashboard()
  }
})
