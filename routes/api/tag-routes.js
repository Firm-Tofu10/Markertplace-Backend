const router = require('express').Router();
const { Tag, Product, ProductTag,Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
	// find all tags
	console.log("hiting endpoint findAll",Tag)
	Product.findAll({
		attributes:['id', 'product_name', 'price', 'stock'],
		include: [
			{
				model: Category,
				attributes:['category_name']
			},
			{
				model: Tag,
				attributes:['tag_name']
			}
		]
	})
		.then(dbProductData => res.json(dbProductData))
		.catch(err => {
		console.log(err);
		res.status(400).json(err);
	});
});
  // be sure to include its associated Product data


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
		Tag.findOne({
			where: {
				Tag: req.params.id
			},
			include: [
				{
					model: Tag,
					through: ProductTag
				}
			]
		})
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create(req.body)
		.then((tag) => {
			if (req.body.tagIds.length) {
			const tagCreate = req.body.tagIds.map((tag_id) => {
				console.log(tag_id)
				return {
					product_id: Tag.id,
					tag_id,
				};
			});
		}
	// create new tag
});
})

router.put('/:id', (req, res) => {
  console.log(req) 
	// update a tag's name by its `id` value
	Tag.update(req.body, {
		where: {
			Tag: req.params.id,
		},
	})
});

router.delete('/:id', (req, res) => {
  console.log(req.params)
	// delete on tag by its `id` value
	if(!req.params.id) 
	res.status(400).json({ message: `cant not delete Tag with ID ${req.params.id}`})
	Tag.delete({
		where: {
			Tag: req.params.id
		},
		include: [
			{
				model: Tag,
				through: ProductTag
			}
		]
	})
});

module.exports = router;
