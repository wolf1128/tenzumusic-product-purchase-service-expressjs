"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var router = express_1.Router();
router.post('/', userController_1.registerUser);
router.post('/info', userController_1.getUser);
exports.default = router;
