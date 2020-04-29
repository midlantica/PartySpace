/*
    Login Form
    Creates an HTML login form for the user

    Authors: Heidi Sprouse
*/

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector("#login")

export const ShowLoginForm = () => {
    contentTarget.innerHTML = `
    <section  class="box userAuth">
        <h2>Welcome to Nutshell!</h2>
        <p>Please login to your dashboard.</p>
    </section>
    <section  class="box userAuth">
        <h2>Login</h2>
            <p>
                <label for="login_username">Username</label><br />
                <input id="login__username" type="text" value="" />
            </p>
            <p>
                <label for="login_password">Password</label><br />
                <input id="login__password" type="password" value="" />
            </p>
            <p>
                <button id="loginButton">Login</button>
            </p>
            <p class="tip">Tip: Usernames and passwords are case sensitive</p>
            <hr />
            <p>
                Not registered yet? <a id="showRegisterFormButton" href="#">Sign up here!</a>
            </p>
    </section>
    `
}

//broadcast the login data to loginUser.js
contentTarget.addEventListener("click", event => {
    if (event.target.id === "loginButton") {
        const loginButtonClickEvent = new CustomEvent("loginButtonClicked", {
            detail: {
                username: document.querySelector("#login__username").value,
                password: document.querySelector("#login__password").value
            }
        })

        eventHub.dispatchEvent(loginButtonClickEvent)
    }
})

//take the user to the register form
contentTarget.addEventListener("click", event => {
    if (event.target.id === "showRegisterFormButton") {
        const showRegisterFormButtonEvent = new CustomEvent("showRegisterFormButtonClicked")

        eventHub.dispatchEvent(showRegisterFormButtonEvent)
    }
})