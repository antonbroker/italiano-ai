"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../db/sequelize");
const id_1 = require("../utils/id");
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => (0, id_1.createId)(),
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'full_name',
    },
    avatarUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: 'avatar_url',
    },
    passwordHash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'password_hash',
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        field: 'created_at',
    },
}, {
    sequelize: sequelize_2.sequelize,
    tableName: 'users',
    timestamps: true,
    underscored: true,
    updatedAt: false,
});
