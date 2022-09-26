const router = require('express').Router();
const { NULL } = require('mysql2/lib/constants/types');
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint
// GetAll dosent'work "SequelizeEagerLoadingError"?
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    attributes: ['id', 'product_name', 'price', 'stock'],
    include: [
      {
        model: Category,
        attributes: ['category_name']
      },
      {
        model: Tag,
        attributes: ['tag_name']
      }
    ]
  })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Get works but throws err?
router.get('/:id', (req, res) => {
	console.log("Hitting endpoint findOne")
	Product.findOne({
		where: {
			id: req.params.id
		},
		attributes: ['id','product_name','price','stock'],
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
			res.status(404).json({message: "Get One err if product"});
			return;
			}
			res.json(response);
		})
		.catch(err => {
			console.log("err in catch");
			res.status(500).json(err);
});
});
//Dosen't work throws err no API called but not found(my err)
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
// update product WORKS!
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
//Delete works but throws err?
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
