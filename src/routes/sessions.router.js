import { Router } from 'express'
import passport from 'passport'
import sessionController  from '../controllers/sessions.controller.js'
import { middleware } from '../middlewares/index.js'


const router = Router()

router.post('/register', middleware.registerValidations, passport.authenticate('register'), sessionController.register)

router.post('/login', middleware.loginValidations, passport.authenticate('login'), sessionController.login)

router.get('/logout', sessionController.logOut)


export default router;