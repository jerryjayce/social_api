"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        const comments = [
            {
                user_id: 1,
                post_id: 1,
                comment: "This is a comment on the first post.",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 1,
                post_id: 1,
                comment: "Another comment on the first post.",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 1,
                post_id: 2,
                comment: "Comment on the second post.",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 2,
                post_id: 3,
                comment: "Comment on the second post.",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 2,
                post_id: 4,
                comment: "Comment on the second post.",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 2,
                post_id: 5,
                comment: "Comment on the second post.",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        await queryInterface.bulkInsert("comments", comments, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('comments', null, {});
    }
};
