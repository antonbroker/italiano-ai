"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProgressModel = exports.UserModel = exports.ChatMessageModel = exports.LessonModel = exports.initModels = void 0;
const ChatMessage_1 = require("./ChatMessage");
Object.defineProperty(exports, "ChatMessageModel", { enumerable: true, get: function () { return ChatMessage_1.ChatMessageModel; } });
const Lesson_1 = require("./Lesson");
Object.defineProperty(exports, "LessonModel", { enumerable: true, get: function () { return Lesson_1.LessonModel; } });
const User_1 = require("./User");
Object.defineProperty(exports, "UserModel", { enumerable: true, get: function () { return User_1.UserModel; } });
const UserProgress_1 = require("./UserProgress");
Object.defineProperty(exports, "UserProgressModel", { enumerable: true, get: function () { return UserProgress_1.UserProgressModel; } });
let initialized = false;
const initModels = () => {
    if (initialized) {
        return;
    }
    Lesson_1.LessonModel.hasMany(UserProgress_1.UserProgressModel, {
        foreignKey: 'lessonId',
        sourceKey: 'id',
        as: 'progress',
    });
    UserProgress_1.UserProgressModel.belongsTo(Lesson_1.LessonModel, {
        foreignKey: 'lessonId',
        targetKey: 'id',
        as: 'lesson',
    });
    Lesson_1.LessonModel.hasMany(ChatMessage_1.ChatMessageModel, {
        foreignKey: 'lessonId',
        sourceKey: 'id',
        as: 'chatMessages',
    });
    ChatMessage_1.ChatMessageModel.belongsTo(Lesson_1.LessonModel, {
        foreignKey: 'lessonId',
        targetKey: 'id',
        as: 'lesson',
    });
    initialized = true;
};
exports.initModels = initModels;
