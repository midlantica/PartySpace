/**
 *    Chat List
 *    This component is responsible for rendering all the components of chat.
 *    messages, new message input, and send message button. This component contains two event listeners.
 *    One to save the new chat message on "send" button click and the other that renders the list when new messages are added.
 * 
 *    Author: Drew Kirkland
 *
 */
import { useChats, saveChats } from "./chatProvider.js";
import { ChatHTML } from "./Chat.js";
import { useUsers } from "../users/userProvider.js";
import { ChatForm } from "./ChatForm.js";

// query DOM for the element that holds our chat list (.chat) and event hub (.container)
const contentTarget = document.querySelector(".chat");
const eventHub = document.querySelector(".container");
let newMessage = "";

// event listener that re-renders the chat on message state change (when new messages are sent)
eventHub.addEventListener("chatStateChanged", (customEvent) => {
  render();
});
// event listener to save new messeage object on button click (#sendMessage)
contentTarget.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "sendMessage") {
    newMessage = document.querySelector("#newMessage").value;

    if (newMessage !== "") {
      const userId = parseInt(sessionStorage.getItem("activeUser"));
      const newMessageObject = {
        userId: userId,
        message: newMessage,
      };
      saveChats(newMessageObject);
    } else {
      alert("Please enter a chat message.");
    }
  }
});

// function to call the HTML representation of a chat message
const render = () => {
  // iterate through the full array of messages and convert each one to HTML representation
  const users = useUsers();
  const messages = useChats();

  contentTarget.innerHTML = `
    <article class="chatPreview">
        ${messages
          .map((message) => {
            // check the userId of the current message and send the corresponding user object
            const user = users.find((user) => user.id === message.userId);
            return ChatHTML(message, user);
          })
          .join("")}
        <div class="chatPreview__form">${ChatForm()}</div>
    </article>
    `;
};

// function that builds the chat list from full array of chat messages
export const ChatList = () => {
  render();
};
