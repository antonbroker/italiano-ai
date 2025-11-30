"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createId = void 0;
const uuidv7_1 = require("uuidv7");
const createId = () => (0, uuidv7_1.uuidv7)();
exports.createId = createId;
