import { database } from '../startup/db';
import uniqid from 'uniqid';

export interface IProduct {
	id: string;
	name: string;
	stock: number;
	price: number;
	date: string;
}

export const addProduct = async (
	name: string,
	stock: number,
	price: number,
	callback: any
) => {
	const id = uniqid();
	const date = new Date(); // We could use moment.js

	const sql = `INSERT INTO PRODUCTS 
                    (id, name, stock, price, date) 
                    VALUES ($id, $name, $stock, $price, $date)`;
	database.run(sql, [id, name, stock, price, date], (error: any) => {
		if (error) {
			callback(error.message);
		}
		const message = 'The Product has been created successfully.';
		callback(message);
	});
};

export const findProduct = (id: string, callback: any) => {
	const sql = `SELECT * FROM PRODUCTS WHERE id = $id`;
	database.get(sql, [id], (error, row) => {
		if (error) {
			callback(error.message);
		}
		callback(row);
	});
};

export const findAllProductsAndFilter = (
	minPrice: number,
	maxPrice: number,
	callback: any
) => {
	if (minPrice & maxPrice) {
		const sql = `SELECT * FROM PRODUCTS WHERE Price BETWEEN $minPrice AND $maxPrice`;
		database.all(sql, [minPrice, maxPrice], (error, products: IProduct[]) => {
			if (error) {
				callback(error.message);
			}
			callback(products);
		});
	} else if (minPrice) {
		const sql = `SELECT * FROM PRODUCTS WHERE Price >= $minPrice`;
		database.all(sql, [minPrice], (error, products: IProduct[]) => {
			if (error) {
				callback(error.message);
			}
			callback(products);
		});
	} else if (maxPrice) {
		const sql = `SELECT * FROM PRODUCTS WHERE Price <= $maxPrice`;
		database.all(sql, [maxPrice], (error, products: IProduct[]) => {
			if (error) {
				callback(error.message);
			}
			callback(products);
		});
	} else {
		const sql = `SELECT * FROM PRODUCTS`;
		database.all(sql, [], (error, products: IProduct[]) => {
			if (error) {
				callback(error.message);
			}
			callback(products);
		});
	}
};

export const updateProductStock = (
	product: string,
	newStock: number,
	callback: any
) => {
	const sql = `UPDATE PRODUCTS SET Stock=$newStock WHERE ID=$product`;
	database.run(sql, [newStock, product], (error: any) => {
		if (error) {
			callback(error.message);
		}
		callback();
	});
};
