import { v4 as uuidv4 } from 'uuid';

let users = []

export const getUsers = (req, res) => {
    console.log(users)
    res
        .status(200)
        .send(users)
}

export const addUser = (req, res) => {
    const user = req.body
    const userWithId = { ...user, id: uuidv4() }
    users.push(userWithId)

    res.status(200).send('User added')
}

export const getUserById = (req, res) => {
    console.log(req.params)

    const { id } = req.params
    const user = users.find((user) => user.id === id)

    res.status(200).send(user)
}

export const deleteUserById = (req, res) => {
    const { id } = req.params

    users = users.filter((user) => user.id !== id)

    res.status(200).send(`User with ${id} id is deleted successfully`)
}

export const updateUser = (req, res) => {
    const { id } = req.params
    const { name, age } = req.body
    const user = users.find((user) => user.id === id)

    if (name) user.name = name
    if (age) user.age = age

    res.status(200).send(`User with ${id} has been udpated`)
}