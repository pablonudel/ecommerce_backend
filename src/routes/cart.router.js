import {Router} from 'express'
import cartController from '../controllers/cart.controller.js'
import { middleware } from '../middlewares/index.js'


const router = Router()

router.get('/products', middleware.checkAuth, cartController.getCartById)
router.post('/products/:id_prod', middleware.checkAuth, cartController.addProductToCart)
router.put('/products/:id_prod', middleware.checkAuth, cartController.updateCartProductById)
router.delete('/products/:id_prod', middleware.checkAuth, cartController.deleteCartProductById)
router.post('/', middleware.checkAuth, cartController.emptyCart)

export default router