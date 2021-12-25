import { RequestHandler } from 'express';
import {
	addProduct,
	findAllProductsAndFilter,
	findProduct,
} from '../models/ProductModel';

// @desc        Create a new product
// @route       POST /api/products
// @access      Public
export const createProduct: RequestHandler = async (req, res) => {
	const { Name, Stock, Price } = req.body;

	// Store in the databse
	addProduct(Name, Stock, Price, (result: any) => {
		res.send(result);
	});
};

// @desc        Get product info
// @route       GET /api/products/:id
// @access      Public
export const getProduct: RequestHandler = async (req, res) => {
	findProduct(req.params.id, (result: any) => {
		res.send(result);
	});
};

// @desc        Get all products info
// @route       GET /api/products?minPrice=xx&maxPrice=xx
// @access      Public
export const getProducts: RequestHandler = async (req, res) => {
	const { minPrice, maxPrice } = req.query;

	findAllProductsAndFilter(
		parseInt(<string>minPrice),
		parseInt(<string>maxPrice),
		(result: any) => {
			res.send(result);
		}
	);
};
