"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        let bcrypt = require("bcrypt");
        const salt_rounds = 10;
        const password = "12345678";


        await queryInterface.bulkInsert("users", [
            {
                full_name: "John Doe",
                age: 30,
                email: "john@example.com",
                password: await bcrypt.hash(password, salt_rounds),
                phone: "123-456-7890",
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                full_name: "Jane Smith",
                age: 25,
                email: "jane@example.com",
                password: await bcrypt.hash(password, salt_rounds),
                phone: "987-654-3210",
                status: "inactive",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", null, {});
    }
};
