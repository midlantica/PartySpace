// search dom for element where we will broadcast custom events
const eventHub = document.querySelector(".container")

// empty array to store the data for use
let messages = [];

// function that broadcasts anytime the state is changed (msg sent or deleted)
const dispatchStateChangeEvent = () => {
        const chatStateChangedEvent = new CustomEvent("chatStateChanged")
        eventHub.dispatchEvent(chatStateChangedEvent)
}

// function to export a copy of the data for another module
export const useChats = () => messages.slice();

// function to get the data from the api
export const getChats = () =>
  fetch("http://localhost:8088/messages")
    .then((response) => response.json())
    .then((parsedMessages) => (messages = parsedMessages));


// function to save (post) a new chat message
export const saveChats = (message) => {
  return fetch("http://localhost:8088/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  })
    .then(getChats)
    .then(dispatchStateChangeEvent);
};
