const router = require('express').Router();
// const { Category, Product } = require('../models');
const { Product, Category, Tag, ProductTag } = require('../../models');
// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
	console.log("hiting endpoint findAll",Category)
	Product.findAll({
		// include: [
		// 	Product, {
		// 		model: Product,
		// 		through: ProductTag
		// 	}
		// ]
	})
  // be sure to include its associated Products
	
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
	Product.findOne({
		include: [
			Category, {
				model: Category,
				through: Category
			}
		]
	})
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
	Category.create(req.body)
		.then((Category) => {
		include: [
			Category, {
				model: Category,
				through: Category
			}
		]
	})
});

router.put('/:id', (req, res) => {
	console.log(req) 
	 // update a category by its `id` value
	Category.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
});

router.delete('/:id', (req, res) => {
  console.log(req.params)
	// delete a category by its `id` value
	if(!req.params.id) res.status(400).json({ message: `cant not find product with ID ${req.params.id}`})
	Product.delete({
		where: {
			id: req.params.id
		},
		include: [
			Category, {
				model: Category,
				through: Category
			}
		]
	})
});

module.exports = router;
