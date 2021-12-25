import { RequestHandler } from 'express';
import { createUser, getUserInfo } from '../models/userModel';

// @desc        Register a new user
// @route       POST /api/users
// @access      Public
export const registerUser: RequestHandler = async (req, res, next) => {
	const { First_name, Last_name, Email, Password, Age } = req.body; // Receive age in YYYY-MM-DD format

	// Store in the databse
	createUser(First_name, Last_name, Email, Password, Age, (result: any) => {
		res.send(result);
	});
};

// @desc        Get user info
// @route       POST /api/users/info
// @access      Public
export const getUser: RequestHandler = async (req, res, next) => {
	const { ID, Password } = req.body;

	getUserInfo(ID, Password, (result: any) => {
		res.send(result);
	});
};
