const router = require('express').Router();
const { NULL } = require('mysql2/lib/constants/types');
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint
// get all products
router.get('/', (req, res) => {
	console.log("hiting endpoint findAll",Product)
	Product.findAll({
		include: [
			{
				model: Category,
				attributes: ["category_name"],
			},
			{
				model: Tag,
				attributes: ["tag_name"]
			}
		]
	})
	.then(products => res.json(products))
	.catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

// get one product
router.get('/:id', (req, res) => {
	console.log(req.params)
	Product.findOne({
		where: {
			id: req.params.id
		},
		include: [
			{
				model: Category,
				attributes: ["category_name"]
			},
			{
				model: Tag,
				attributes: ["tag_name"]
			}
		]
	})
		.then(Product => {
			if (!Product) {
			res.status(500).json({message: "Get One err if"});
			return;
			}
			res.json(Product);
		})
		.catch(err => {
			console.log("err in catch");
			res.status(500).json(err);
	// find a single product by its `id`
	// be sure to include its associated Category and Tag data
});
});

// create new product
router.post('/', (req, res) => {
	console.log("Hiting Post", req.body)
	/* req.body should look like this... 
		{
			product_name: "Basketball",
			price: 200.00,
			stock: 3,
			tagIds: [1, 2, 3, 4]
		}
	*/
	if (req.body=={}){
		res.status(400).json({message: "Missing req propertys of req body."})
		return
	}
	Product.create(req.body)
		.then((product) => {
			// if there's product tags, we need to create pairings to bulk create in the ProductTag model
			if (req.body.tagIds.length) {
				const productTagIdArr = req.body.tagIds.map((tag_id) => {
					console.log(tag_id)
					return {
						product_id: product.id,
						tag_id,
					};
				});
				return ProductTag.bulkCreate(productTagIdArr); //Was erring
			}
			// if no product tags, just respond
			// res.status(200).json(product);
		})
		.then((productTagIds) => res.status(200).json(productTagIds))
		// .then((productTagIds) => res.status(200))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

// update product
router.put('/:id', (req, res) => { 
	console.log(req) 
// update product data
Product.update(req.body, {
	where: {
		id: req.params.id,
	},
})
	.then((product) => {
		// find all associated tags from ProductTag
		return ProductTag.findAll({ where: { product_id: req.params.id } });
	})
	.then((productTags) => {
		// get list of current tag_ids
		const productTagIds = productTags.map(({ tag_id }) => tag_id);
		// create filtered list of new tag_ids
		const newProductTags = req.body.tagIds
			.filter((tag_id) => !productTagIds.includes(tag_id))
			.map((tag_id) => {
				return {
					product_id: req.params.id,
					tag_id,
				};
			});
		// figure out which ones to remove
		const productTagsToRemove = productTags
			.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
			.map(({ id }) => id);

		// run both actions
		return Promise.all([
			ProductTag.destroy({ where: { id: productTagsToRemove } }),
			ProductTag.bulkCreate(newProductTags),
		]);
	})
	.then((updatedProductTags) => res.json(updatedProductTags))
	.catch((err) => {
		// console.log(err);
		res.status(400).json(err);
	});
});

router.delete('/:id', (req, res) => {
// delete one product by its `id` value
console.log(req.params)
Product.destroy({
	where: {
		id: req.params.id
	}
})
	.then(dbProductData => {
		if(dbProductData) {
			res.status(404).json({message: 'No product Delete.'});
		return;
		}
		res.json(dbProductData);
	})
	.catch(err => {
		console.log(err);
		res.json(500).json(err);
	});
});


module.exports = router;
