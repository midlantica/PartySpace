const eventHub = document.querySelector(".container")
// const contentTarget = document.querySelector(".chatPreview__message")

export const ChatHTML = (message, user) => {
    const username = user.username
    
    return `
        <div class="chatPreview__message">
            <p id="chatUser">${username}<button value=${username} id="addChatFriend--${user.id}">+</button></p><p>${message.message}</p>
        </div> 
    `
}

// event listener that calls "add friend" on button click
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("addChatFriend")) {
            const addNewFriendEvent = new CustomEvent("AddNewFriend", {
                detail: {
                    friendName: clickEvent.target.value
                }
            })
            eventHub.dispatchEvent(addNewFriendEvent)
    }

})