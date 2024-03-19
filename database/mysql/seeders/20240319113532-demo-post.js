"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const posts = [
            {
                user_id: 1,
                post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 1,
                post: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 2,
                post: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 2,
                post: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 2,
                post: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        await queryInterface.bulkInsert("posts", posts, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('posts', null, {});
    }
};
