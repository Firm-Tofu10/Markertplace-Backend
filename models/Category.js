const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}
//seting up the relationships and state of the category modle
Category.init(
  {
    id: {
			type: DataTypes.INTEGER,
			allowNull:false,
			autoIncrement: true,
			primaryKey: true
		},
		category_name: {
			type: DataTypes.STRING,
			allowNull:false
		}	
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);
module.exports = Category;
