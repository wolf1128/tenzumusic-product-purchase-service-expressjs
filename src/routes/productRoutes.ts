import { Router } from 'express';
import { createProduct, getProduct, getProducts } from '../controllers/productController';
const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);

export default router;
