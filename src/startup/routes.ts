import express, { Express } from 'express';

export default function (app: Express) {
	app.use(express.json());


}
