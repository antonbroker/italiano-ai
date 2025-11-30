"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProgressService = void 0;
const httpError_1 = require("../utils/httpError");
const models_1 = require("../models");
exports.userProgressService = {
    async list(filter) {
        const progress = await models_1.UserProgressModel.findAll({
            where: {
                userEmail: filter.userEmail,
                ...(filter.lessonId ? { lessonId: filter.lessonId } : {}),
            },
            order: [['createdAt', 'DESC']],
        });
        return progress.map((record) => ({
            id: record.id,
            userEmail: record.userEmail,
            lessonId: record.lessonId,
            completed: record.completed,
            progressPercentage: record.progressPercentage,
            createdAt: record.createdAt.toISOString(),
            updatedAt: record.updatedAt.toISOString(),
        }));
    },
    async upsert(payload) {
        const [record] = await models_1.UserProgressModel.upsert({
            userEmail: payload.userEmail,
            lessonId: payload.lessonId,
            completed: payload.completed,
            progressPercentage: payload.progressPercentage,
        }, { returning: true });
        return {
            id: record.id,
            userEmail: record.userEmail,
            lessonId: record.lessonId,
            completed: record.completed,
            progressPercentage: record.progressPercentage,
            createdAt: record.createdAt.toISOString(),
            updatedAt: record.updatedAt.toISOString(),
        };
    },
    async update(id, updates) {
        const record = await models_1.UserProgressModel.findByPk(id);
        if (!record) {
            throw (0, httpError_1.notFoundError)('Progress not found');
        }
        await record.update({
            completed: updates.completed ?? record.completed,
            progressPercentage: updates.progressPercentage ?? record.progressPercentage,
        });
        return {
            id: record.id,
            userEmail: record.userEmail,
            lessonId: record.lessonId,
            completed: record.completed,
            progressPercentage: record.progressPercentage,
            createdAt: record.createdAt.toISOString(),
            updatedAt: record.updatedAt.toISOString(),
        };
    },
};
