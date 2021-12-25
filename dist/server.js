"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./startup/routes"));
var config_1 = __importDefault(require("./startup/config"));
var app = express_1.default();
config_1.default();
routes_1.default(app);
var port = process.env.PORT || 5000;
var server = app.listen(port, function () {
    return console.log("Server running in " + process.env.NODE_ENV + " mode, listening on " + port + "...");
});
exports.default = server;
