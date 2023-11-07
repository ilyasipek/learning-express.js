import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'
import { db } from '../db/db-client'
import * as schema from '../db/schema'
import { eq } from 'drizzle-orm'

type User = typeof schema.users.$inferSelect

type UserRequest = {
    age: number,
    name: string
}

// let users: User[] = []

export const getUsers = async (req: Request, res: Response<User[]>) => {
    const users = await db.select().from(schema.users).execute()

    console.log(users)
    res
        .status(200)
        .send(users)
}

export const addUser = (req: Request<UserRequest>, res: Response) => {
    const userRequest: UserRequest = req.body
    const user = { age: userRequest.age, name: userRequest.name, id: uuidv4() }

    db.insert(schema.users)
        .values(user)
        .execute()

    res.status(200).send('User added')
}

export const getUserById = async (req: Request, res: Response) => {
    console.log(req.params)

    const { id } = req.params
    const user = getUserByIdFromDb(id)

    res.status(200).send(user)
}

async function getUserByIdFromDb(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, id)).execute()
    return user
}

export const deleteUserById = (req: Request, res: Response) => {
    const { id } = req.params

    db.delete(schema.users).where(eq(schema.users.id, id)).execute()

    res.status(200).send(`User with ${id} id is deleted successfully`)
}

export const updateUser = async (req: Request<{ id: string }, {}, UserRequest>, res: Response) => {
    const { id } = req.params
    const { name, age } = req.body
    const user: User | undefined = await getUserByIdFromDb(id)

    if (user == undefined) {
        res.status(404).send(`User with ${id} was not found`)
        return
    }

    user.name = name
    user.age = age

    res.status(200).send(`User with ${id} has been udpated`)
}