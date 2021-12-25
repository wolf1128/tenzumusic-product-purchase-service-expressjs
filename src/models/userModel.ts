import { database } from '../startup/db';
import uniqid from 'uniqid';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

// Types

export interface IUser {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	age: number;
	purchased_products: [string];
}

// Database Queries

export const createUser = async (
	fName: string,
	lName: string,
	email: string,
	password: string,
	age: string,
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
                    (id, first_name, last_name, email, password, age, purchased_products) 
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

	database.get(sql, [id], async (error: any, userRow: IUser) => {
		if (error) {
			callback(error.message);
		}

		// check passwords
		if (await bcrypt.compare(password, userRow.password)) {
			userRow.password = '****';
			callback(userRow);
		} else {
			callback(new Error('Passwords are not match!'));
		}
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

// Validations

export function validateRegisterUser(user: IUser) {
	const schema = Joi.object({
		first_name: Joi.string().required(),
		last_name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(0).required(),
		age: Joi.string().required(),
	});

	return schema.validate(user);
}

export function validateGetUser(userInfo: { id: string; password: string }) {
	const schema = Joi.object({
		id: Joi.string().required(),
		password: Joi.string().min(0).required(),
	});

	return schema.validate(userInfo);
}
