var express = require('express');
var router = express.Router();
var contactModel = require('../model/contact.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// xem du lieu
router.get('/xem', function(req, res, next) {
  contactModel.find({},function(err,dulieu){
    res.render('xem', { title: 'Xem du lieu', data:dulieu });
  })
});// end xem du lieu
// xoa du lieu
router.get('/xoa/:idcanxoa', function(req, res, next) {
  var idcanxoa = req.params.idcanxoa;
  contactModel.findByIdAndRemove(idcanxoa).exec();
  res.redirect('/xem');
});
// sua du lieu
router.get('/sua/:idcansua', function(req, res, next) {
  var idcansua = req.params.idcansua;
  contactModel.find({_id:idcansua}, function (err,dulieu) {
    res.render('sua',{title:"Sua du lieu",data:dulieu});
  });
});
//dang post de nhan du lieu o tren roi sua
router.post('/sua/:idcansua', function(req, res, next) {
  var idcansua = req.params.idcansua;
  //dua vao id, ten, tuoi, truyen tu view vao du lieu
  contactModel.findById(idcansua, function(err, dulieu){
    if(err) return handleError(err);
    dulieu.ten = req.body.ten;
    dulieu.tuoi = req.body.tuoi;
    dulieu.save();
    res.redirect('/xem');
  })
});
// them du lieu
router.get('/them', function(req, res, next) {
  res.render('them',{title:"them du lieu"});

});
//dang post de nhan du lieu o tren roi sua
router.post('/them', function(req, res, next) {
  var phantu ={
    'ten' : req.body.ten,
    'tuoi' : req.body.tuoi
  }
  var dulieunew = new contactModel(phantu);
  dulieunew.save();
  res.redirect('/xem');

});
module.exports = router;
