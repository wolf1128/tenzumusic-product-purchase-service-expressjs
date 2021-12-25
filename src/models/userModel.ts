import { database } from '../startup/db';
import uniqid from 'uniqid';
import bcrypt from 'bcryptjs';

export interface IUser {
	ID: string;
	First_name: string;
	Last_name: string;
	Email: string;
	Password: string;
	Age: number;
	Purchased_products: [string];
}


export const createUser = async (
	fName: string,
	lName: string,
	email: string,
	password: string,
	age: number,
	callback: any
) => {
	// Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Calculate the age && return decimal
	const decimalAge = new Date().getFullYear() - new Date(age).getFullYear();

	// Generate unique ID
	const id = uniqid();

	const sql = `INSERT INTO USERS 
                    (ID, First_name, Last_name, Email, Password, Age, Purchased_products) 
                    VALUES ($id, $fName, $lName, $email, $password, $age, null)`;
	database.run(
		sql,
		[id, fName, lName, email, hashedPassword, decimalAge],
		(error: any) => {
			if (error) {
				callback(error.message);
			}
			const message = 'The user has been created successfully.';
			callback(message);
		}
	);
};

export const findUser = (id: string, password: string, callback: any) => {
	const sql = `SELECT * FROM USERS WHERE ID = $id`;

	// check passwords
	// await bcrypt.compare(password)

	database.get(sql, [id], (error, row) => {
		if (error) {
			callback(error.message);
		}
		row.Password = '****';
		callback(row);
	});
};

export const findUserById = (id: string, callback: any) => {
	const sql = `SELECT * FROM USERS WHERE ID = $id`;

	database.get(sql, [id], (error, row) => {
		if (error) {
			callback(error.message);
		}
		callback(row);
	});
};

export const updateUserPurchasedProducts = (
	user: string,
	newPurchasedProducts: string,
	callback: any
) => {
	const sql = `UPDATE USERS SET Purchased_products=$newPurchasedProducts WHERE ID=$user`;
	database.run(sql, [newPurchasedProducts, user], (error: any, row: any) => {
		if (error) {
			callback(error.message);
		}
		callback();
	});
};
