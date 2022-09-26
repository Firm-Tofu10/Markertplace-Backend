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
				model: Product,
				attributes: ['id','product_name','price','category_id']
			}
			// {
			// 	model: Category,
			// 	attributes: ['id','product_name','price','category_id']
			// 	// ["category_name"]
			// },
			// {
			// 	model: Tag,
			// 	attributes: ['id','product_name','price','category_id']
			// 	// ["tag_name"]
			// }
		]
	})
	.then(response => res.json(response))
	.catch(err => {
		console.log("Product");
		console.log(err);
		res.status(500).json(err);
	});
});


router.get('/:id', (req, res) => {
	console.log("Hitting endpoint findOne")
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
		.then(response => {
			if (!response) {
			res.status(500).json({message: "Get One err if product"});
			return;
			}
			res.status(500).json(response);
		})
		.catch(err => {
			console.log("err in catch");
			res.status(500).json(err);
});
});

router.post('/', (req, res) => { //not working at the moment
	console.log("Hiting Post product",Product)
	Product.create(req.body)
		.then((response,err) => {
			console.log("Endpoint product post")
			if(err)
				res.status(500).json(err)
			else
				res.status(200).json(response)
		})
	});
	/* req.body should look like this... 
		{
			product_name: "Basketball",
			price: 200.00,
			stock: 3,
			tagIds: [1, 2, 3, 4]
		}
	*/
	//This is commeted out to get cleaner code
// 	if (req.body=={}){
// 		res.status(400).json({message: "Missing req propertys of req body."})
// 		return
// 	}
// 	Product.put(req.body)
// 		.then((response) => {
// 			// if there's product tags, we need to create pairings to bulk create in the ProductTag model
// 			if (req.body.tagIds.length) {
// 				const productTagIdArr = req.body.tagIds.map((tag_id) => {
// 					console.log(tag_id)
// 					return {
// 						product_id: product.id,
// 						tag_id,
// 					};
// 				});
// 				return ProductTag.bulkCreate(productTagIdArr); //Was erring
// 			}
// 			res.status(200).json(product);
// 		})
// 		.then((response) => res.status(200).json(response))
// 		// .then((productTagIds) => res.status(200))
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(400).json(err);
// 		});
// });

// update product
router.put('/:id', (req, res) => { 
	console.log("before then product PUT") 
	console.log(req)
// update product data
Product.update(req.body, {
	where: {
		id: req.params.id,
	}
})
	.then((response) => {
		if (!response) {
			res.status(500).json({message:"Put Product in if"});
		}
		res.status(200).json(response);
	 })
	 .catch(err => {
		console.log("Put catch err in function");
		res.status(500).json(err);
	 });
});

router.delete('/:id', (req, res) => {
console.log("Hiting endpoint delete",Product)
console.log(req.params)
Product.destroy({
	where: {
		id: req.params.id
	}
})
	.then(response => {
		if(response){
			res.status(500).json({message: 'No product Delete.'});
		}
		res.status(200).json(response);
	})
	.catch(err => {
		console.log("Delete err after catch");
		res.json(500).json(err);
	});
});


module.exports = router;
