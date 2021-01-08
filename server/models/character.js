'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Character.belongsTo(models.User, {foreignKey: 'userId'});
    }
  };
  Character.init({
    userId: DataTypes.INTEGER,    
    character_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    deck: DataTypes.TEXT,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};