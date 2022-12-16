import {Router} from 'express'
import usersController from '../controllers/users.controller.js'
import { uploadAvatar } from "../utils/index.js";
import { middleware } from '../middlewares/index.js'

const router = Router()

router.get('/', middleware.checkAuth, middleware.isAdmin, usersController.getUsers)
router.get('/:id', middleware.checkAuth, middleware.userOwnAccount, usersController.getUserById)
router.post('/', middleware.checkAuth, middleware.isSuperAdmin, middleware.createUserValidations, usersController.createUser)
router.put('/:id', middleware.checkAuth, uploadAvatar.single('avatar'), middleware.updateUserValidations, usersController.updateUserById)
router.delete('/:id', middleware.checkAuth, usersController.deleteUserById)

export default router