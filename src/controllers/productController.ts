import { RequestHandler } from 'express';
import {
	addProduct,
	findAllProductsAndFilter,
	findProduct,
	updateProductStock,
} from '../models/productModel';
import {
	findUser,
	findUserById,
	updateUserPurchasedProducts,
} from '../models/userModel';

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
export const getProducts: RequestHandler<
	any,
	any,
	any,
	{
		minPrice: string;
		maxPrice: string;
	}
> = async (req, res) => {
	const { minPrice, maxPrice } = req.query;

	findAllProductsAndFilter(
		parseInt(minPrice),
		parseInt(maxPrice),
		(result: any) => {
			res.send(result);
		}
	);
};

// @desc        Purchase product
// @route       PUT /api/products/purchase
// @access      Public
export const purchaseProduct: RequestHandler = async (req, res) => {
	const {
		user,
		product,
		count,
	}: { user: string; product: string; count: number } = req.body;
	// let productInfo: {
	// 	ID: string;
	// 	Name: string;
	// 	Stock: number;
	// 	Price: number;
	// 	Date: string;
	// };
	let totalPrice: number;

	findProduct(product, (productInfo: any) => {
		if (productInfo.Stock < count) {
			res.status(500).send({
				message_fa: 'متاسفیم!تعداد درخواست بیشتر از موجودی است!',
				message_en: 'Sorry! Order count is greather than the stock!',
			});
		} else {
			const newStock = productInfo.Stock - count;
			totalPrice = productInfo.Price * count;
			updateProductStock(product, newStock, (err: any) => {
				// console.log('error: ', err);
			});

			findUserById(user, (foundUser: any) => {
				let userProducts = !foundUser.Purchased_products
					? null
					: foundUser.Purchased_products;

				// Convert string to array (SQLite constraint) | ['1234', '567', '89']
				let purchasedProducts = [];
				if (userProducts) {
					// purchasedProducts = Array.from(userProducts).filter( // xxx
					// 	(p) => p !== ','
					// );
					purchasedProducts = userProducts
						.split("'")
						.filter((p: string) => p !== '[' && p !== ']' && p !== ', ');

					purchasedProducts.push(productInfo.ID);
				} else {
					purchasedProducts = Array(productInfo.ID);
				}

				// Convert back to string
				let updatedPurchasedProducts = purchasedProducts.toString();

				updateUserPurchasedProducts(
					user,
					updatedPurchasedProducts,
					(result: any) => {
						res.send({
							successMessage_fa: 'با تشکر از خرید شما!',
							successMessage_en: 'Thanks for purchasing from us!',
							totalPrice,
						});
					}
				);
			});
		}
	});
};
