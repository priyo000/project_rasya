var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  var sql =`SELECT bm.*,u.username FROM barang_masuk AS bm INNER JOIN user AS u ON bm.id_user = u.id_user;`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(rows)
  })
})

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var sql =`SELECT bm.*,u.username FROM barang_masuk AS bm INNER JOIN user AS u ON bm.id_user = u.id_user WHERE id_barang_masuk="${id}";`;
  db.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(row[0])
  })
})

router.post('/baru',function(req, res, next) {
  var id_user = req.body.id_user;
  var sql = `INSERT INTO barang_masuk (id_user) VALUES ("${id_user}");`;
  db.query(sql, function(err, result){
    if (err) {
      res.status(500).send({ error: 'Gagal Tambah Barang Masuk'})
    }
    res.json(result.insertId)
  })
})

router.put('/simpan/:id', function(req, res, next) {
  var id = req.params.id;
  var supplier = req.body.supplier;
  var pembayaran = req.body.pembayaran;
  var bukti = req.body.bukti;
  var lokasi = req.body.lokasi;
  var sql = `UPDATE barang_masuk SET supplier="${supplier}",pembayaran="${pembayaran}",bukti="${bukti}",tanggal=NOW(),lokasi="${lokasi}" WHERE id_barang_masuk="${id}";`;
  db.query(sql, function(err, result){
    if (err){
      res.status(500).send({ error: 'Gagal Simpan Barang Masuk'})
    }
    res.json({'status':'Sukses Simpan Barang Masuk'})
  })
})


router.delete('/hapus/:id_barang_masuk', function(req, res, next) {
  var id_barang_masuk = req.params.id_barang_masuk;
  var sql = `DELETE FROM detail_barang_masuk WHERE id_barang_masuk="${id_barang_masuk}";`;
  var sql2 = `DELETE FROM barang_masuk WHERE id_barang_masuk="${id_barang_masuk}";`;
  db.query(sql, function(err, result) {
    if(err){
      res.status(500).send({error: 'Pembatalan Barang Masuk Gagal.'})
    }
    db.query(sql2, function(err, result) {
      if(err){
        res.status(500).send({error: 'Pembatalan Barang Masuk Gagal..'})
      }
      res.json({'status':'Pembatalan Barang Masuk Sukses'})
    })
  })
})


module.exports = router;
