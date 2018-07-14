var express = require('express');
var router = express.Router();
// ket noi mongodb
const MongoClient = require('mongodb').MongoClient;
var chuyenthanhObjectID = require('mongodb').ObjectID;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'contact';

// Use connect method to connect to the server // de test
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   client.close();
// });
// end ket noi mongodb

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* them du lieu */
router.get('/them', function(req, res, next) {
  res.render('them', { title: 'them moi du lieu' });
});
router.post('/them', function(req, res, next) {
  var duLieu ={
    "ten": req.body.ten,
    "dt": req.body.dt
  }
  const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('nguoidung');
    // Insert some documents
    collection.insert(duLieu, function(err, result) {
      assert.equal(err, null);
      console.log("them du lieu thanh cong");
      callback(result);
    });
  }
  // Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
    client.close();
  });
});
  res.redirect('/them');
});

/* GET xem. */
router.get('/xem', function(req, res, next) {
  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('nguoidung');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs);
    });
  }
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      findDocuments(db, function(dulieu) {
        res.render('xem', { title: 'xem', data:dulieu });
        console.log(dulieu);
        client.close();
      });

  });
 
});

/* xoa */
router.get('/xoa/:idcanxoa', function(req, res, next) {
  var idcanxoa = chuyenthanhObjectID(req.params.idcanxoa);
  //ham xoa
  const xoacontact = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('nguoidung');
    // Delete document where a is 3
    collection.deleteOne({ _id : idcanxoa }, function(err, result) {
      assert.equal(err, null);
      console.log("xoa thanh cong");
      callback(result);
    });    
  }
  //ket noi mongo de xoa 
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      xoacontact(db, function() {
        client.close();
      });
      res.redirect('/xem');
  });
  
}); //end xoa du lieu
/* sua page. */
router.get('/sua/:idcansua', function(req, res, next) {
  var idcansua = chuyenthanhObjectID(req.params.idcansua);
  //tim du lieu
  const findDocuments = function(db, callback) {
    const collection = db.collection('nguoidung');
    collection.find({_id: idcansua}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("da tim thay");
      callback(docs);
    });
  }
  //ket noi voi du lieu tim duoc
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    const db = client.db(dbName);
      findDocuments(db, function(dulieu) {
        res.render('sua',{title:'Sua du lieu', data:dulieu})
        client.close();
      });

  });

});// end get du lieu sua

/* GET home page. */
router.post('/sua/:idcansua', function(req, res, next) {
  var idcansua = chuyenthanhObjectID(req.params.idcansua);
  var duLieu ={
    "ten": req.body.ten,
    "dt": req.body.dt
  }
  const suacontact = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('nguoidung');
    collection.updateOne({ _id : idcansua }, { $set: duLieu }, function(err, result) {
      assert.equal(err, null);
      console.log("sua thanh cong");
      callback(result);
    });  
  }
  // Use connect method to connect to the server

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("sua thanh cong");
    const db = client.db(dbName);
      suacontact(db, function() {
        client.close();
      });
      res.redirect('/xem');
  });

});// end post sua du lieu

module.exports = router;
