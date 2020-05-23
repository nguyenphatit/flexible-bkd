const Sequelize = require('sequelize');
const DateUtil = require('./../libs/date-util');

module.exports = {
    createdDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: () => {
            return DateUtil.getUTCDateTime();
        },
        field: 'created_date'
    },
    updatedDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: () => {
            return DateUtil.getUTCDateTime();
        },
        field: 'updated_date'
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        field: 'is_deleted'
    }
}