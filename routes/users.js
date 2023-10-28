import express from 'express'
import { v4 as uuidv4 } from 'uuid';

const router = express.Router()

const users = []

router.get('/', (req, res) => {
    console.log(users)
    res
        .status(200)
        .send(users)
})

router.post('/', (req, res) => {
    const user = req.body
    const userWithId = { ...user, id: uuidv4() }
    users.push(userWithId)

    res.status(200).send('User added')
})

router.get("/:id", (req, res) => {
    console.log(req.params)

    const { id } = req.params
    const user = users.find((user) => user.id === id)

    res.status(200).send(user)
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    const foundUser = users.find((user) => user.id === id)
    users.pop(foundUser)

    res.status(200).send("User is deleted successfully")
})

router.patch("/:id", (req, res) => {
    const { id } = req.params
    const { name, age } = req.body
    const user = users.find((user) => user.id === id)

    if (name) user.name = name
    if (age) user.age = age

    res.status(200).send(`User with ${id} has been udpated`)
})

export default router