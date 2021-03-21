const { DataTypes } = require('sequelize');

module.exports = (client) => {
    const Department = client.define(
        'Department',
        {
            idDepartment: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            DepartmentCity: {
                type: DataTypes.STRING,
            },
            CountOfWorkers: {
                type: DataTypes.INTEGER,
            }
        },
        {
            tableName: 'department',
            timestamps: false
        }
    );

    return Department;
};
