import sqlite3 from 'sqlite3';
import path from 'path';

// Initialize Connection
const sqlite = sqlite3.verbose();
const db_path = path.join(
	__dirname,
	'../database',
	'tenzumusic-product-purchase-service-database.sqlite'
);
export const database = new sqlite3.Database(
	db_path,
	sqlite.OPEN_READWRITE,
	(err) => {
		if (err) {
			console.log(err.message);
		}

		// console.log('Successfully connected to the database.');
	}
);
