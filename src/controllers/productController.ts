import { RequestHandler } from 'express';
import {
	addProduct,
	findAllProductsAndFilter,
	findProduct,
	IProduct,
	updateProductStock,
	validateCreateProduct,
	validatePurchaseProduct,
} from '../models/productModel';
import {
	findUserById,
	IUser,
	updateUserPurchasedProducts,
} from '../models/userModel';

// @desc        Create a new product
// @route       POST /api/products
// @access      Public
export const createProduct: RequestHandler = async (req, res) => {
	const { error } = validateCreateProduct(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const { name, stock, price } = req.body as {
		name: string;
		stock: number;
		price: number;
	};

	// Store in the databses
	addProduct(name, stock, price, (result: IProduct) => {
		res.status(201).send(result);
	});
};

// @desc        Get product info
// @route       GET /api/products/:id
// @access      Public
export const getProduct: RequestHandler<{ id: string }> = async (req, res) => {
	const productId = req.params.id;

	findProduct(productId, (result: IProduct) => {
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
		(result: IProduct[]) => {
			res.send(result);
		}
	);
};

// @desc        Purchase product
// @route       PUT /api/products/purchase
// @access      Public
export const purchaseProduct: RequestHandler = async (req, res) => {
	const { error } = validatePurchaseProduct(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const {
		user,
		product,
		count,
	}: { user: string; product: string; count: number } = req.body;

	let totalPrice: number;

	findProduct(product, (productInfo: IProduct) => {
		if (productInfo.stock < count) {
			res.status(500).send({
				message_fa: 'متاسفیم!تعداد درخواست بیشتر از موجودی است!',
				message_en: 'Sorry! Order count is greather than the stock!',
			});
		} else {
			const newStock = productInfo.stock - count;
			totalPrice = productInfo.price * count;
			updateProductStock(product, newStock, (err: unknown) => {
				// console.log('error: ', err);
			});

			findUserById(user, (foundUser: IUser) => {
				let userProducts = !foundUser.purchased_products
					? null
					: foundUser.purchased_products;

				// Convert string to array (SQLite constraint) | ['1234', '567', '89']
				let purchasedProducts = [];
				if (userProducts) {
					purchasedProducts = userProducts
						.split("'")
						.filter((p: string) => p !== '[' && p !== ']' && p !== ', ');

					purchasedProducts.push(productInfo.id);
				} else {
					purchasedProducts = Array(productInfo.id);
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
