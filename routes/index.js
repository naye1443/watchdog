const express = require('express');
const main = require('../graphql/graphql.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  main().then((obj) => {
    res.render('index', { title: 'Status', db: obj });
  });
});

module.exports = router;
