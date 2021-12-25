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
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseProduct = exports.getProducts = exports.getProduct = exports.createProduct = void 0;
var productModel_1 = require("../models/productModel");
var userModel_1 = require("../models/userModel");
// @desc        Create a new product
// @route       POST /api/products
// @access      Public
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, Name, Stock, Price;
    return __generator(this, function (_b) {
        _a = req.body, Name = _a.Name, Stock = _a.Stock, Price = _a.Price;
        // Store in the databse
        productModel_1.addProduct(Name, Stock, Price, function (result) {
            res.send(result);
        });
        return [2 /*return*/];
    });
}); };
exports.createProduct = createProduct;
// @desc        Get product info
// @route       GET /api/products/:id
// @access      Public
var getProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        productModel_1.findProduct(req.params.id, function (result) {
            res.send(result);
        });
        return [2 /*return*/];
    });
}); };
exports.getProduct = getProduct;
// @desc        Get all products info
// @route       GET /api/products?minPrice=xx&maxPrice=xx
// @access      Public
var getProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, minPrice, maxPrice;
    return __generator(this, function (_b) {
        _a = req.query, minPrice = _a.minPrice, maxPrice = _a.maxPrice;
        productModel_1.findAllProductsAndFilter(parseInt(minPrice), parseInt(maxPrice), function (result) {
            res.send(result);
        });
        return [2 /*return*/];
    });
}); };
exports.getProducts = getProducts;
// @desc        Purchase product
// @route       PUT /api/products/purchase
// @access      Public
var purchaseProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user, product, count, totalPrice;
    return __generator(this, function (_b) {
        _a = req.body, user = _a.user, product = _a.product, count = _a.count;
        productModel_1.findProduct(product, function (productInfo) {
            if (productInfo.Stock < count) {
                res.status(500).send({
                    message_fa: 'متاسفیم!تعداد درخواست بیشتر از موجودی است!',
                    message_en: 'Sorry! Order count is greather than the stock!',
                });
            }
            else {
                var newStock = productInfo.Stock - count;
                totalPrice = productInfo.Price * count;
                productModel_1.updateProductStock(product, newStock, function (err) {
                    // console.log('error: ', err);
                });
                userModel_1.findUserById(user, function (foundUser) {
                    var userProducts = !foundUser.Purchased_products
                        ? null
                        : foundUser.Purchased_products;
                    // Convert string to array (SQLite constraint) | ['1234', '567', '89']
                    var purchasedProducts = [];
                    if (userProducts) {
                        // purchasedProducts = Array.from(userProducts).filter( // xxx
                        // 	(p) => p !== ','
                        // );
                        purchasedProducts = userProducts
                            .split("'")
                            .filter(function (p) { return p !== '[' && p !== ']' && p !== ', '; });
                        purchasedProducts.push(productInfo.ID);
                    }
                    else {
                        purchasedProducts = Array(productInfo.ID);
                    }
                    // Convert back to string
                    var updatedPurchasedProducts = purchasedProducts.toString();
                    userModel_1.updateUserPurchasedProducts(user, updatedPurchasedProducts, function (result) {
                        res.send({
                            successMessage_fa: 'با تشکر از خرید شما!',
                            successMessage_en: 'Thanks for purchasing from us!',
                            totalPrice: totalPrice,
                        });
                    });
                });
            }
        });
        return [2 /*return*/];
    });
}); };
exports.purchaseProduct = purchaseProduct;
