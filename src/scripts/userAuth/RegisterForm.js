/*
    Register Form
    Creates an HTML registeration form for the user along with a click event to save the new user data and a back button

    Authors: Heidi Sprouse
*/

const contentTarget = document.querySelector("#register>section")
const eventHub = document.querySelector(".container")

export const ShowRegisterForm = () => {
    contentTarget.innerHTML = `
    <h2>Register</h2>
        <p>
            <label for="register_username">Username</label><br />
            <input id="register__username" type="text" />
        </p>
        <p>
            <label for="register_email">E-mail Address</label><br />
            <input id="register__email" type="text" />
        </p>
        <p>
            <label for="register_password">Password</label><br />
            <input id="register__password" type="password" />
        </p>
        <p>
            <label for="register_passwordConfirm">Confirm Password</label><br />
            <input id="register__passwordConfirm" type="password" />
        </p>
        <p>
            <button id="registerButton">Register</button>
        </p>
        <p>
            <button id="registerBackButton">Back</button>
        </p>
    `
}

//broadcast the registration data to registerUser.js 
contentTarget.addEventListener("click", event => {
    if (event.target.id === "registerButton") {
        const registerButtonClickEvent = new CustomEvent("registerButtonClicked", {
            detail: {
                username: document.querySelector("#register__username").value,
                email: document.querySelector("#register__email").value,
                password: document.querySelector("#register__password").value,
                password2: document.querySelector("#register__passwordConfirm").value
            }
        })
        eventHub.dispatchEvent(registerButtonClickEvent)
    }
})

//create an event to tell the app controller to set the page state back to "login"
contentTarget.addEventListener("click", event => {
    if (event.target.id === "registerBackButton") {
        const registerButtonClickEvent = new CustomEvent("registerBackButtonClicked")

        eventHub.dispatchEvent(registerButtonClickEvent)
    }
})