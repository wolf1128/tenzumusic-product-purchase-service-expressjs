import { database } from '../startup/db';
import uniqid from 'uniqid';
import bcrypt from 'bcryptjs';

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
                    VALUES ($id, $fName, $lName, $email, $password, $age, '')`;
	database.run(sql, [id, fName, lName, email, hashedPassword, decimalAge], (error: any) => {
		if (error) {
			callback(error.message);
		}
		const message = 'The user has been created successfully.';
		callback(message);
	});
};
