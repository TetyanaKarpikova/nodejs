module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
        * Add altering commands here.
        *
        * Example:
        * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
        await queryInterface.createTable('department2',
            {
                idDepartment: {
                    type: Sequelize.DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true
                },
                DepartmentCity: {
                    type: Sequelize.DataTypes.STRING,
                },
                CountOfWorkers: {
                    type: Sequelize.DataTypes.INTEGER,
                }
            });
    },
    down: async (queryInterface) => {
        /**
        * Add reverting commands here.
        *
        * Example:
        * await queryInterface.dropTable('users');
        */
        await queryInterface.dropTable('department2');
    }
};
