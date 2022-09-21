const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

// const Tag = require('./Tag')

// const Product = require('./Product')

ProductTag.init(
  {
    id: {
			type: DataTypes.INTEGER,
			allowNull:false,
			autoIncrement: true,
			primaryKey: true
		},
		product_id:{
			type: DataTypes.INTEGER,
			allowNull:false
		},
		tag_id:{
			type: DataTypes.INTEGER,
			allowNull:false
		}
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
