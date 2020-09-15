var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  var sql =`SELECT * FROM riwayat_iklan;`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(rows)
  })
})

router.get('/:id_iklan', function(req, res, next) {
  var id_iklan = req.params.id_iklan;
  var sql =`SELECT * FROM riwayat_iklan where id_iklan = "${id_iklan}";`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(rows)
  })
})

router.post('/keluar', function(req, res, next) {
  var id_iklan = req.body.id_iklan;
  var biaya = req.body.biaya;
  var tanggal = req.body.tanggal;
  var sql = `INSERT INTO riwayat_iklan (id_iklan,biaya,tanggal) values ("${id_iklan}","${biaya}","${tanggal}");`;
  var sql2 = `UPDATE iklan SET saldo=saldo-${biaya} WHERE id_iklan="${id_iklan}";`;
  db.query(sql, function(err, result){
    if (err) {
      res.status(500).send({ error: 'Laporan Iklan Gagal ditambahkan.'})
    }
    db.query(sql2, function(err, result){
      if (err) {
        res.status(500).send({ error: 'Laporan Iklan Gagal ditambahkan..'})
      }
      res.json({'status':'Laporan Iklan Berhasil', id: result.insertId})
    })
  })
})

router.post('/tambah', function(req, res, next) {
  var id_iklan = req.body.id_iklan;
  var biaya = req.body.biaya;
  var tanggal = req.body.tanggal;
  var sql = `INSERT INTO riwayat_iklan (id_iklan,biaya,tanggal) values ("${id_iklan}","${biaya}","${tanggal}");`;
  var sql2 = `UPDATE iklan SET saldo=saldo+${biaya} WHERE id_iklan="${id_iklan}";`;
  db.query(sql, function(err, result){
    if (err) {
      res.status(500).send({ error: 'Penambahan Saldo Iklan Gagal.'})
    }
    db.query(sql2, function(err, result){
      if (err) {
        res.status(500).send({ error: 'Penambahan Saldo Iklan Gagal..'})
      }
      res.json({'status':'Menambahkan Saldo Iklan Berhasil', id: result.insertId})
    })
  })
})


module.exports = router;
