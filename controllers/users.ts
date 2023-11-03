import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express';

interface User {
    id: string,
    age: number,
    name: string
}

type UserRequest = {
    age: number,
    name: string
}

let users: User[] = []

export const getUsers = (req: Request, res: Response<User[]>) => {
    console.log(users)
    res
        .status(200)
        .send(users)
}

export const addUser = (req: Request<UserRequest>, res: Response) => {
    const userRequest: UserRequest = req.body
    const userWithId: User = {
        age: userRequest.age,
        name: userRequest.name,
        id: uuidv4()
    }
    users.push(userWithId)

    res.status(200).send('User added')
}

export const getUserById = (req: Request, res: Response) => {
    console.log(req.params)

    const { id } = req.params
    const user = users.find((user) => user.id === id)

    res.status(200).send(user)
}

export const deleteUserById = (req: Request, res: Response) => {
    const { id } = req.params

    users = users.filter(user => user.id !== id);

    res.status(200).send(`User with ${id} id is deleted successfully`)
}

export const updateUser = (req: Request<{ id: string }, {}, UserRequest>, res: Response) => {
    const { id } = req.params
    const { name, age } = req.body
    const user: User | undefined = users.find((user) => user.id === id)

    if (user == undefined) {
        res.status(404).send(`User with ${id} was not found`)
        return
    }

    user.name = name
    user.age = age

    res.status(200).send(`User with ${id} has been udpated`)
}