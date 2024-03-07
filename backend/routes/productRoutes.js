import express from 'express'
const router = express.Router()
import { getProducts, getProductById } from '../controllers/productController.js'

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)
router.get('/', async (req, res) => {
    const keyword = req.query.name
        ? {
              name: {
                  $regex: req.query.name,
                  $options: 'i', // i pour case insensitive
              },
          }
        : {};

    const products = await Product.find({ ...keyword });
    res.json(products);
});


export default router