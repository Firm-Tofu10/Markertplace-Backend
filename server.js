const express = require('express');
const routes = require('./routes');
const Sequelize = require('sequelize');
const { Category, Product, ProductTag } = require('./models');
// import sequelize connection (might be right)

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

await Category.sync({ force: true });
console.log("The table for the Category model was just (re)created!");

await index.sync({ force: true });
console.log("The index model was just (re)created!");

await Product.sync({ force: true });
console.log("The table for the Product model was just (re)created!");

await ProductTag.sync({ force: true });
console.log("The table for the ProductTag model was just (re)created!");

await Tag.sync({ force: true });
console.log("The table for the Tag model was just (re)created!");

// sync sequelize models to the database, then turn on the server (Still need)
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
