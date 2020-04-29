// function that represents form as HTML
const render = () => {
  return `
      <form>
        <input
          type="text"
          id="newMessage"
          placeholder="Enter message..."
          maxlength="140"
          autocomplete="off"
          required
        >
        <button type="button" class="chatPreview__button" id="sendMessage">SEND</button>
      </form>
        `
}

// function to render the form & export
export const ChatForm = () => {
  return render()
}
