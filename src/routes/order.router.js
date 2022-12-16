import {Router} from 'express'
import orderController from '../controllers/order.controller.js'
import { middleware } from '../middlewares/index.js'

const router = Router()

router.get('/', middleware.checkAuth, middleware.isAdmin, orderController.getOrders)
router.get('/:id', middleware.checkAuth, orderController.getOrderById)
router.post('/',middleware.checkAuth, orderController.saveOrder)
router.put('/:id',middleware.checkAuth, middleware.isAdmin,orderController.updateOrderById)

export default router