'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favoritedMarvel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      favoritedMarvel.belongsTo(models.User, {foreignKey: 'usermarvel_id'})
    }
  };
  favoritedMarvel.init({
    title: DataTypes.STRING,
    comic_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'favoritedMarvel',
  });
  return favoritedMarvel;
};