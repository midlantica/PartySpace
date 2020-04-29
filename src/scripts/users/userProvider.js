/*
    User Data Provider
    These functions pull data from the users resource in database.json

    Authors: Heidi Sprouse
*/

let users = []

export const getUsers = () => {
    return fetch("http://localhost:8088/users?_embed=friends")
        .then(response => response.json())
        .then(response => users = response)
}

export const useUsers = () => users.slice()

//register a new user
export const registerUser = user => {
    return fetch('http://localhost:8088/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(getUsers)
}