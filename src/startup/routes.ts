import express, { Express } from 'express';
import userRoutes from '../routes/userRoutes';

export default function (app: Express) {
	app.use(express.json());

	app.use('/api/users', userRoutes);
}
