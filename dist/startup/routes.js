"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userRoutes_1 = __importDefault(require("../routes/userRoutes"));
function default_1(app) {
    app.use(express_1.default.json());
    app.use('/api/users', userRoutes_1.default);
}
exports.default = default_1;
