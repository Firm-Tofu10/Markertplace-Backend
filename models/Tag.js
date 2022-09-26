const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

// const ProductTag = require('./ProductTag')
//seting up the relationships and state of the tag modle
Tag.init(
  {
		id: {
			type: DataTypes.INTEGER,
			allowNull:false,
			autoIncrement: true,
			primaryKey: true
		},
		tag_name:{
			type: DataTypes.STRING
		}
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);
module.exports = Tag;