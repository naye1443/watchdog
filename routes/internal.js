const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('internal', { title: 'Internal Monitor' });
});

module.exports = router;