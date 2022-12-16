import { checkAuth, isAdmin, isSuperAdmin, ownAccount, userOwnAccount} from "./isAuthenticated.js"
import { logger } from "./logger.js"
import {registerValidations, loginValidations, addProductValidations, updateProductValidations, createUserValidations, updateUserValidations } from './validations.js'

export const middleware ={
    checkAuth,
    isAdmin,
    isSuperAdmin,
    ownAccount,
    userOwnAccount,
    logger,
    registerValidations,
    loginValidations,
    addProductValidations,
    updateProductValidations,
    createUserValidations,
    updateUserValidations
}