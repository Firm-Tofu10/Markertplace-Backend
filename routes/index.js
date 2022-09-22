const router = require('express').Router();
const apiRoutes = require('../api');
const productRoute = require('../api/product-routes');
// const productRoutes = require('./product-routes');

router.use('/api/product-routes', productRoute, (req, res) => {
	res.send("<h1>Display Product!</h1>"); //Need Help Fixing
});

router.use('/api', apiRoutes, (req, res) => { 
	res.send("<h1>API Called</h1>");
});

router.use((req, res) => {
	res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;