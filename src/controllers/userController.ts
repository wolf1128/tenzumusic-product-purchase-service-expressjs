import { RequestHandler } from 'express';
import { createUser } from '../models/userModel';

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
