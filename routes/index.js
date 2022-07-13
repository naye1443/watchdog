const express = require('express');
const main = require('../graphql.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  main().then((obj) => {
    for (const [key, value] of Object.entries(obj)) {
      console.log(value.name);
      console.log(value.status);
    }
    res.render('index', { title: 'Status', db: obj });
  });
});

module.exports = router;
