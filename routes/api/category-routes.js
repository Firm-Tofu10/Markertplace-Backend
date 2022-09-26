const router = require('express').Router();
// const { Category, Product } = require('../models');
const { Product, Category, Tag, ProductTag } = require('../../models');
// The `/api/categories` endpoint
//This gets all categories
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
	.then(response => res.json(response))
		.catch(err => {
			console.log("err");
			res.status(500).json(err)
		});
});
//This gets a single category
router.get('/:id', (req, res) => {
  // find one category by its `id` value
	console.log("hiting endpoint findOne",Category)
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
//This creates a single category
router.post('/', (req, res) => {
	console.log("hiting endpoint Post",Category)
	Category.create(req.body)
		.then((response,err) => {
			console.log("endpoint category post")
			if(err)
				res.status(500).json(err)
			else
				res.status(200).json(response)
	})
});
//This lets you edit the item when it is already in the database
router.put('/:id', (req, res) => {
	console.log("before then category PUT")
	console.log(req) 
	 // update a category by its `id` value
	Category.update(req.body, {
		where: {
			id: req.params.id
		}
	})
	.then(response => {
		if (!response) {
			res.status(500).json({message:"Put category in if"});
		}
		res.status(200).json(response);
	 })
	 .catch(err => {
		console.log("Put catch err in function");
		res.status(500).json(err);
	 });
});
//This alows you to delete a single category via id
router.delete('/:id', (req, res) => {
	console.log("hiting endpoint delete",Category)
  console.log(req.params)
	// delete a category by its `id` value
	// if(!req.params.id) res.status(400).json({ message: `cant not find product with ID ${req.params.id}`})
	Category.destroy({
		where: {
			id: req.params.id
		}
	})
	.then((response) => {
		if(!response){
			res.status(404).json({message: "Delete Category Failed"});
		}
		res.json(response);
	})
	.catch(err => {
		console.log("Delete err after catch");
		res.status(500).json(err);
	});
});

module.exports = router;