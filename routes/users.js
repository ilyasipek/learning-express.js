import express from 'express'
import {getUsers, addUser, getUserById, deleteUserById, updateUser} from '../controllers/users.js'

const router = express.Router()

router.get('/', getUsers)

router.post('/', addUser)

router.get("/:id", getUserById)

router.delete("/:id", deleteUserById)

router.patch("/:id", updateUser)

export default router