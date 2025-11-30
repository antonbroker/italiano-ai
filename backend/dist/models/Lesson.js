"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../db/sequelize");
const id_1 = require("../utils/id");
class LessonModel extends sequelize_1.Model {
}
exports.LessonModel = LessonModel;
LessonModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => (0, id_1.createId)(),
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    level: {
        type: sequelize_1.DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
        allowNull: false,
    },
    topics: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
    },
    duration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
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
    tableName: 'lessons',
    timestamps: true,
    underscored: true,
});
