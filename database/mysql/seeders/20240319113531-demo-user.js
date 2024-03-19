"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("users", [
            {
                full_name: "John Doe",
                age: 30,
                email: "john@example.com",
                password: "password123",
                phone: "123-456-7890",
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                full_name: "Jane Smith",
                age: 25,
                email: "jane@example.com",
                password: "password456",
                phone: "987-654-3210",
                status: "inactive",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    }
};
