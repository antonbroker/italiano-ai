"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userProgress_controller_1 = require("../controllers/userProgress.controller");
const router = (0, express_1.Router)();
router.get('/', userProgress_controller_1.userProgressController.list);
router.post('/', userProgress_controller_1.userProgressController.upsert);
router.put('/:id', userProgress_controller_1.userProgressController.update);
exports.default = router;
