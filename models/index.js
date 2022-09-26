// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//setting up relationships for category
Category.hasMany(Product, {
	foreignKey: 'category_id',
});


// Products belongToMany Tags (through ProductTag)
// Products belongsTo Category


//setting up relationships for product
Product.belongsTo(Category, {
	foreignKey: 'category_id',
});
Product.belongsToMany(Tag, { through: 
	ProductTag
})


// Categories have many Products
// Tags belongToMany Products (through ProductTag)


//setting up relationships for tag
Tag.belongsToMany(Product, { 
	through: ProductTag,
	foreignKey: 'tag_id'
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
