import {Router} from 'express'
import productsController from '../controllers/products.controller.js'
import { uploadProduct } from "../utils/index.js";
import { middleware } from '../middlewares/index.js'


const router = Router()

router.get('/', productsController.getProducts)
router.get('/:id', productsController.getProductById)
router.post('/',middleware.checkAuth, middleware.isAdmin, uploadProduct.single('image'), middleware.addProductValidations, productsController.saveProduct)
router.put('/:id',middleware.checkAuth, middleware.isAdmin, uploadProduct.single('image'), middleware.updateProductValidations, productsController.updateProductById)
router.delete('/:id',middleware.checkAuth, middleware.isAdmin, productsController.deleteProductById)

export default router