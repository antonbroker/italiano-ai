"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lesson_routes_1 = __importDefault(require("./lesson.routes"));
const chatMessage_routes_1 = __importDefault(require("./chatMessage.routes"));
const userProgress_routes_1 = __importDefault(require("./userProgress.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const authenticate_1 = require("../middleware/authenticate");
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/lessons', authenticate_1.requireAuth, lesson_routes_1.default);
router.use('/chat-messages', authenticate_1.requireAuth, chatMessage_routes_1.default);
router.use('/user-progress', authenticate_1.requireAuth, userProgress_routes_1.default);
exports.default = router;
