const router = require('express').Router();
// Import all of the API routes
const apiRoutes = require('./api');
// use /api prefix before user and thought routes.
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('404 ERROR');
});

module.exports = router;
