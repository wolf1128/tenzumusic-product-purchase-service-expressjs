"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductStock = exports.findAllProductsAndFilter = exports.findProduct = exports.addProduct = void 0;
var db_1 = require("../startup/db");
var uniqid_1 = __importDefault(require("uniqid"));
var addProduct = function (name, stock, price, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var id, date, sql;
    return __generator(this, function (_a) {
        id = uniqid_1.default();
        date = new Date();
        sql = "INSERT INTO PRODUCTS \n                    (ID, name, stock, price, date) \n                    VALUES ($id, $name, $stock, $price, $date)";
        db_1.database.run(sql, [id, name, stock, price, date], function (error) {
            if (error) {
                callback(error.message);
            }
            var message = 'The Product has been created successfully.';
            callback(message);
        });
        return [2 /*return*/];
    });
}); };
exports.addProduct = addProduct;
var findProduct = function (id, callback) {
    var sql = "SELECT * FROM PRODUCTS WHERE ID = $id";
    db_1.database.get(sql, [id], function (error, row) {
        if (error) {
            callback(error.message);
        }
        callback(row);
    });
};
exports.findProduct = findProduct;
var findAllProductsAndFilter = function (minPrice, maxPrice, callback) {
    if (minPrice & maxPrice) {
        var sql = "SELECT * FROM PRODUCTS WHERE Price BETWEEN $minPrice AND $maxPrice";
        db_1.database.all(sql, [minPrice, maxPrice], function (error, row) {
            if (error) {
                callback(error.message);
            }
            callback(row);
        });
    }
    else if (minPrice) {
        var sql = "SELECT * FROM PRODUCTS WHERE Price >= $minPrice";
        db_1.database.all(sql, [minPrice], function (error, row) {
            if (error) {
                callback(error.message);
            }
            callback(row);
        });
    }
    else if (maxPrice) {
        var sql = "SELECT * FROM PRODUCTS WHERE Price <= $maxPrice";
        db_1.database.all(sql, [maxPrice], function (error, row) {
            if (error) {
                callback(error.message);
            }
            callback(row);
        });
    }
    else {
        var sql = "SELECT * FROM PRODUCTS";
        db_1.database.all(sql, [], function (error, row) {
            if (error) {
                callback(error.message);
            }
            callback(row);
        });
    }
};
exports.findAllProductsAndFilter = findAllProductsAndFilter;
var updateProductStock = function (product, newStock, callback) {
    var sql = "UPDATE PRODUCTS SET Stock=$newStock WHERE ID=$product";
    db_1.database.run(sql, [newStock, product], function (error) {
        if (error) {
            callback(error.message);
        }
        callback();
    });
};
exports.updateProductStock = updateProductStock;
