const router = require('express').Router();
const apiRoutes = require('../api');
const productRoute = require('../api/product-routes');

router.use('/api', apiRoutes, (req, res) => { //need help to fix this function
	res.send("<h1>Correct Route!</h1>");
});

router.use('/api/product-routes.js', productRoute, (req, res) => {
	res.send("<h1>Display Product!</h1>"); //Need Help Fixing
});

router.use((req, res) => {
	res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;