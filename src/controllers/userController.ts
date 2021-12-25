import { RequestHandler } from 'express';
import { createUser, findUser } from '../models/userModel';

// @desc        Register a new user
// @route       POST /api/users
// @access      Public
export const registerUser: RequestHandler = async (req, res) => {
	const { First_name, Last_name, Email, Password, Age } = req.body; // Receive age in YYYY-MM-DD format

	// Store in the databse
	createUser(First_name, Last_name, Email, Password, Age, (result: any) => {
		res.send(result);
	});
};

// @desc        Get user info
// @route       POST /api/users/info
// @access      Public
export const getUser: RequestHandler = async (req, res) => {
	const { ID, Password } = req.body;

	findUser(ID, Password, (result: any) => {
		res.send(result);
	});
};
