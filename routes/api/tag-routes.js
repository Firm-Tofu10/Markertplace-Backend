const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint
//Dosen't work throws err no API called but not found(my err)
router.get('/', (req, res) => {
   Tag.findAll({
     include: [
       {
         model: Product,
         through: ProductTag,
       },
     ],
   })
     .then((tags) => res.status(200).json(tags))
     .catch((err) => res.status(500).json(err));
 });

//Dosen't work throws err no API called but not found(my err)
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
		Tag.findOne({
			where: {
				id: req.params.id
			},
			include: [
				{
					model: Product,
					through: ['ProductTag','price','stock','category_id']
				}
			]
		})
		.then(response => res.json(response))
		.catch(err =>{
			console.log("err");
			res.status(500).json(err)
		});
});
//Dosen't work throws err no API called but not found(my err)
router.post('/', (req, res) => {
	console.log("Hiting endpoint Post",Tag)
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
//Dosen't work throws err no API called but not found(my err)
router.put('/:id', (req, res) => {
  console.log("before then Tag PUT")
	console.log(req) 
	// update a tag's name by its `id` value
	Tag.update(req.body, {
		where: {
			Tag: req.params.id,
		},
	})
	.then(response => {
		if (!response) {
			res.status(500).json({message:"Put Tag in if"})
		}
		res.status(200).json(response);
	})
	.catch(error => {
		console.log("Put catch err in function");
		res.status(500).json(err);
	})
});
//Dosen't work throws err no API called but not found(my err)
router.delete('/:id', (req, res) => {
  console.log("Hiting endpoint delete",Tag)
	console.log(req.params)
	// delete on tag by its `id` value
	Tag.destroy({
		where: {
			id: req.params.id
		}
	})
	.then((response) => {
		if(!response){
			res.status(500).json({message: "Delete Tag Failed"});
		}
		res.status(200).json(response);
	})
	.catch(err => {
		console.log("Delete err after catch");
		res.status(500).json(err);
	});
});
// 	if(!req.params.id) 
// 	res.status(400).json({ message: `cant not delete Tag with ID ${req.params.id}`})
// 	Tag.delete({
// 		where: {
// 			Tag: req.params.id
// 		},
// 		include: [
// 			{
// 				model: Tag,
// 				through: ProductTag
// 			}
// 		]
// 	})
// });

module.exports = router;
