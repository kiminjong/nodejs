var express = require('express');
var router = express.Router();
var multer  = require('multer'); //upload


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//khai bao duong dan
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
// check up anh
function checkfileupload (req, file, cb) {
    if(!file.originalname.match(/\.(jpg|png|jpeg|gif)$/)){
      cb(new Error('Ban chi duoc upload anh'));
    } else{
      cb(null, true);
    }
}
var upload = multer({ storage: storage, fileFilter:checkfileupload })
// Lay du lieu tu form
router.post('/', upload.single('anhsp'), function(req, res, next) {
  var tieude = req.body.tdsp;
  res.send('Success: ' + tieude);
});

module.exports = router;
