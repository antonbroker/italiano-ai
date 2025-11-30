"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessageModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../db/sequelize");
const id_1 = require("../utils/id");
class ChatMessageModel extends sequelize_1.Model {
}
exports.ChatMessageModel = ChatMessageModel;
ChatMessageModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => (0, id_1.createId)(),
    },
    userEmail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'user_email',
    },
    message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('user', 'tutor'),
        allowNull: false,
        defaultValue: 'user',
    },
    lessonId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        field: 'lesson_id',
        references: {
            model: 'lessons',
            key: 'id',
        },
        onDelete: 'SET NULL',
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        field: 'created_at',
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        field: 'updated_at',
    },
}, {
    sequelize: sequelize_2.sequelize,
    tableName: 'chat_messages',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            fields: ['user_email', 'created_at'],
        },
    ],
});
