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
