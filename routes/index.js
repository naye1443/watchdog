const express = require('express');
const main = require('../graphql.js');
const router = express.Router();

router.get('/', (req, res, next) => {
  // const fakeDatabase = (() => {
  //   const db = {
  //     // Unique category ID
  //     1: {
  //       categoryName: 'Finance / Analysis',
  //       products: {
  //         // Unique product ID (DRN?)
  //         // 0001: {
  //         //   name: 'test',
  //         //   status: 0
  //         // },
  //       },
  //     },
  //     2: {
  //       categoryName: 'Sales & Marketing',
  //       products: {
  //
  //       },
  //     },
  //     3: {
  //       categoryName: 'Third Party Risk',
  //       products: {
  //
  //       },
  //     },
  //     4: {
  //       categoryName: 'Master Data',
  //       products: {
  //
  //       },
  //     },
  //     5: {
  //       categoryName: 'Corporate Compliance',
  //       products: {
  //
  //       },
  //     },
  //     6: {
  //       categoryName: 'Small Business',
  //       products: {
  //
  //       },
  //     },
  //   };
  //
  //   const _generateEntries = () => {
  //     for (const entry in db) {
  //       // Random number of entries between 5 and 20
  //       const count = Math.floor(Math.random() * 15) + 5;
  //       for (let i = 0; i < count; i++) {
  //         const state = () => {
  //           // 0 = up, 1 = down, 2 = errored
  //           const random = Math.floor(Math.random() * 100);
  //           if ((random % 3) === 0) {
  //             if (random < 50) {
  //               return 2;
  //             }
  //             return 1;
  //           }
  //           return 0;
  //         }
  //         db[entry].products[`${i}`] = {
  //           name: 'Test',
  //           status: state(),
  //         };
  //       }
  //     }
  //   };
  //
  //   _generateEntries();
  //
  //   return {
  //     db,
  //   }
  // })();

  res.render('index', { title: 'Status', db: fakeDatabase.db });
});

main().then((obj) => {
  for (const [key, value] of Object.entries(obj)) {
    console.log(value.name);
    console.log(value.status);
  }
});

console.log();

module.exports = router;
