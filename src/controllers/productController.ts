import { RequestHandler } from 'express';
import { addProduct } from '../models/ProductModel';

// @desc        Create a new product
// @route       POST /api/products
// @access      Public
export const createProduct: RequestHandler = async (req, res, next) => {
	const { Name, Stock, Price } = req.body;

	// Store in the databse
	addProduct(Name, Stock, Price, (result: any) => {
		res.send(result);
	});
};
