"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
var sqlite3_1 = __importDefault(require("sqlite3"));
var path_1 = __importDefault(require("path"));
// Initialize Connection
var sqlite = sqlite3_1.default.verbose();
var db_path = path_1.default.join(__dirname, '../database', 'tenzumusic-product-purchase-service-db.sqlite');
exports.database = new sqlite3_1.default.Database(db_path, sqlite.OPEN_READWRITE, function (err) {
    if (err) {
        console.log(err.message);
    }
    // console.log('Successfully connected to the database.');
});
