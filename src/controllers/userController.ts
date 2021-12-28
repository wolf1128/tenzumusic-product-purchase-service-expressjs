import { RequestHandler } from 'express';
import {
	createUser,
	findUser,
	IUser,
	validateGetUser,
	validateRegisterUser,
} from '../models/userModel';

// @desc        Register a new user
// @route       POST /api/users
// @access      Public
export const registerUser: RequestHandler = async (req, res) => {
	const { error } = validateRegisterUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const { first_name, last_name, email, password, age } = req.body as {
		first_name: string;
		last_name: string;
		email: string;
		password: string;
		age: string;
	}; // Receive age in YYYY-MM-DD format

	// Store in the databse
	createUser(first_name, last_name, email, password, age, (result: IUser) => {
		res.status(201).send(result);
	});
};

// @desc        Get user info
// @route       POST /api/users/info
// @access      Public
export const getUser: RequestHandler = async (req, res) => {
	const { error } = validateGetUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const { id, password } = req.body as { id: string; password: string };

	findUser(id, password, (result: IUser) => {
		if (result instanceof Error) {
			res.status(404).send(result.message);
		}
		res.send(result);
	});
};
