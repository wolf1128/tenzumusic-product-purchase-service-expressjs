import { database } from '../startup/db';
import uniqid from 'uniqid';

export const addProduct = async (
	name: string,
	stock: number,
	price: number,
	callback: any
) => {
	const id = uniqid();
	const date = new Date();

	const sql = `INSERT INTO PRODUCTS 
                    (ID, name, stock, price, date) 
                    VALUES ($id, $name, $stock, $price, $date)`;
	database.run(sql, [id, name, stock, price, date], (error: any) => {
		if (error) {
			callback(error.message);
		}
		const message = 'The Product has been created successfully.';
		callback(message);
	});
};

export const findProduct = async (id: string, callback: any) => {
	const sql = `SELECT * FROM PRODUCTS WHERE ID = $id`;
	database.get(sql, [id], (error, row) => {
		if (error) {
			callback(error.message);
		}
		callback(row);
	});
};

export const findAllProductsAndFilter = async (
	minPrice: number,
	maxPrice: number,
	callback: any
) => {
	if (minPrice & maxPrice) {
		const sql = `SELECT * FROM PRODUCTS WHERE Price BETWEEN $minPrice AND $maxPrice`;
		database.all(sql, [minPrice, maxPrice], (error, row) => {
			if (error) {
				callback(error.message);
			}
			callback(row);
		});
	} else if (minPrice) {
		const sql = `SELECT * FROM PRODUCTS WHERE Price >= $minPrice`;
		database.all(sql, [minPrice], (error, row) => {
			if (error) {
				callback(error.message);
			}
			callback(row);
		});
	} else if (maxPrice) {
		const sql = `SELECT * FROM PRODUCTS WHERE Price <= $maxPrice`;
		database.all(sql, [maxPrice], (error, row) => {
			if (error) {
				callback(error.message);
			}
			callback(row);
		});
	} else {
		const sql = `SELECT * FROM PRODUCTS`;
		database.all(sql, [], (error, row) => {
			if (error) {
				callback(error.message);
			}
			callback(row);
		});
	}
};
