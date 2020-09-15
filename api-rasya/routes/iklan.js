var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  var sql =`SELECT * FROM iklan;`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(rows)
  })
})

router.get('/:id_user/:id_sumber', function(req, res, next) {
  var id_user = req.params.id_user;
  var id_sumber = req.params.id_sumber;
  var sql =`SELECT i.*,u.username,b.nama_barang,s.sumber FROM iklan AS i INNER JOIN barang AS b ON i.kode_barang=b.kode_barang INNER JOIN user AS u ON i.id_user=u.id_user INNER JOIN sumber AS s ON i.id_sumber = s.id_sumber where i.id_user = "${id_user}" AND i.id_sumber="${id_sumber}"`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(rows)
  })
})

router.post('/baru', function(req, res, next) {
  var id_user = req.body.id_user;
  var kode_barang = req.body.kode_barang;
  var id_sumber = req.body.id_sumber;
  var sql = `INSERT INTO iklan (kode_barang,id_user,id_sumber) values ("${kode_barang}","${id_user}","${id_sumber}");`
  db.query(sql, function(err, result){
    if (err) {
      res.status(500).send({ error: 'Gagal Menambahkan Iklan'})
    }
    res.json({'status':'Menambahkan Iklan Berhasil', id: result.insertId})
  })

})



module.exports = router;
