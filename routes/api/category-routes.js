const router = require('express').Router();
// const { Category, Product } = require('../models');
const { Product, Category, Tag, ProductTag } = require('../../models');
// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
	console.log("hiting endpoint findAll",Category)
	Category.findAll({
		include: [
			 {
				model: Product,
				attributes: ['id','product_name','price','category_id']
			}
		]
	}) 
	.then(category => res.json(category))
		.catch(err => {
			console.log("err");
			res.status(500).json(err)
		});
  // be sure to include its associated Products
	
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
	Category.findOne({
		include: [
			 {
				model: Product,
				attributes: ['id','product_name','price','price','stock','category_id']
			}
		]
	})
	.then(category => res.json(category))
		.catch(err => {
			console.log("err");
			res.status(500).json(err)
		});
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
	Category.create(req.body)
		.then((Category) => {
			console.log("endpoint category post")
			res.status(500).json(err)
	})
});

router.put('/:id', (req, res) => {
	console.log(req) 
	 // update a category by its `id` value
	Category.update(req.body, {
		where: {
			id: req.params.id
		}
	})
	console.log("before then category PUT")
	.then(category => {
		if (!category) {
			res.status(500).json({message:"Put category in if"});
			return;
		}
		res.json(Category);
	 })
	 .catch(err => {
		console.log("Put catch err in function");
		res.status(200).json(err);
	 });
});

router.delete('/:id', (req, res) => {
  console.log(req.params)
	// delete a category by its `id` value
	// if(!req.params.id) res.status(400).json({ message: `cant not find product with ID ${req.params.id}`})
	Category.delete({
		where: {
			id: req.params.id
		}
	})
	.then(category => {
		if(!Category){
			res.status(500).json({message: "Delete Category"});
			return;
		}
		res.json(Category);
	})
	.catch(err => {
		console.log("Delete err after catch");
		res.status(500).json(err);
	});
});

module.exports = router;