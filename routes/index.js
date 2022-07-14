const express = require('express');
const output = require('../graphql/graphql.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  output().then((obj) => {
    res.render('index', { title: 'Status', db: obj });
  });
});

module.exports = router;
