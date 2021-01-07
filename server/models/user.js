'use strict';
const {
    Model
} = require('sequelize');

const { hashPassword } = require('../helpers/hash');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.favoritedMarvel, {foreignKey: 'user_id'})
        }

        fullname() {
            return `${this.firstName} ${this.lastName}`
        }
    };
    User.init({
        firstName: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field first name is required'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field last name is required'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field email is required'
                },
                isEmail: {
                    msg: 'invalid email'
                }
            },
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field password is required'
                },
                len: {
                    args: 6,
                    msg: 'password at least have 6 character'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate(instance) {
                instance.password = hashPassword(instance.password)
            }
        }
    });
    return User;
};