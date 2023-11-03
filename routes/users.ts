import express from 'express'
import * as userController from '../controllers/users'

const router = express.Router()

router.get('/', userController.getUsers)

router.post('/', userController.addUser)

router.get("/:id", userController.getUserById)

router.delete("/:id", userController.deleteUserById)

router.patch("/:id", userController.updateUser)

export default router