'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('favoritedMarvels', 'usermarvel_id', {
      type: Sequelize.INTEGER,
      references: { 
        model: { tableName: 'Users' },
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('favoritedMarvels', 'usermarvel_id', {})
  }
};
