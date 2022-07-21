

const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res, next) => {
  res.render('externalform', { title: 'External Form' });    // loads internal pug view
});

// gets post request at current root which is "/routes/internal.js"
router.post('/', function (req,res){

  // stringifies the output from the req
  console.log(req);
  _starTime_str = JSON.stringify(req._startTime);
  body = JSON.stringify(req.body);

  if (fs.existsSync("../logfiles/log.txt")){
    fs.appendFile("../logfiles/log.txt",`UTC Time Zone: ${_starTime_str}\n${body}\n---------------------------------------\n` , function(err){
      if (err) throw err;
      console.log("file already exists, appending...");
    });
  }else{
    fs.writeFile("../logfiles/log.txt", `${_starTime_str}\n${body}\n---------------------------------------\n` , function(err){
      if (err) throw err;
      console.log("file created successfully");
    });
  
  }
  
})

module.exports = router;