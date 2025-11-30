"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatMessage_controller_1 = require("../controllers/chatMessage.controller");
const router = (0, express_1.Router)();
router.get('/', chatMessage_controller_1.chatMessageController.list);
router.post('/', chatMessage_controller_1.chatMessageController.create);
exports.default = router;
