"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProgressModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../db/sequelize");
const id_1 = require("../utils/id");
class UserProgressModel extends sequelize_1.Model {
}
exports.UserProgressModel = UserProgressModel;
UserProgressModel.init({
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
    lessonId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        field: 'lesson_id',
        references: {
            model: 'lessons',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    progressPercentage: {
        type: sequelize_1.DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
        field: 'progress_percentage',
        validate: {
            min: 0,
            max: 100,
        },
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
    tableName: 'user_progress',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ['user_email', 'lesson_id'],
        },
    ],
});
