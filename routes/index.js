const router = require('express').Router();
const apiRoutes = require('./api');
const productRoute = require('./api/product-routes');
// const productRoutes = require('./product-routes');

//This gives the user feed back when the route is called but not found this could be syntax related or the way you are entering data could be inccorect.
router.use('/api', apiRoutes, (req, res) => { 
	res.status(404).json({error:"API called but not found!"});
});

//This gives the user when the route is just wrong!
router.use((req, res) => {
	res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;