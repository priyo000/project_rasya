var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  var sql =`SELECT * FROM barang;`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(rows)
  })
})

router.get('/:kode_barang', function(req, res, next) {
  var kode_barang = req.params.kode_barang;
  var sql =`SELECT * FROM barang where kode_barang = "${kode_barang}";`;
  db.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(row[0])
  })
})

//berdasarkan Kategori
router.get('/kategori/:id_kategori', function(req, res, next) {
  var id_kategori = req.params.id_kategori;
  var sql =`SELECT * FROM barang WHERE id_kategori = "${id_kategori}";`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(rows)
  })
})

router.post('/baru', function(req, res, next) {
  var kode_barang = req.body.kode_barang;
  var nama_barang = req.body.nama_barang;
  var berat_barang = req.body.berat_barang;
  var harga_modal = req.body.harga_modal;
  var stok_bsi = req.body.stok_bsi;
  var stok_toko = req.body.stok_toko;
  var stok_gudang = req.body.stok_gudang;
  var id_kategori = req.body.id_kategori;
  var sql = `INSERT INTO barang (kode_barang,nama_barang,berat_barang,harga_modal,stok_bsi,stok_toko,stok_gudang,id_kategori) values ("${kode_barang}","${nama_barang}","${berat_barang}","${harga_modal}","${stok_bsi}","${stok_toko}","${stok_gudang}","${id_kategori}");`;
  db.query(sql, function(err, result){
    if (err) {
      res.status(500).send({ error: 'Gagal Input Data Data Barang'})
    }
    res.json({'status':'Input data Barang Berhasil'})
  })

})

router.put('/update/:kode_barang', function(req, res, next) {
  var kode_barang = req.params.kode_barang;
  var new_kode_barang = req.body.kode_barang;
  var barang = req.body.nama_barang;
  var berat_barang = req.body.berat_barang;
  var harga_modal = req.body.harga_modal;
  var stok_bsi = req.body.stok_bsi;
  var stok_toko = req.body.stok_toko;
  var stok_gudang = req.body.stok_gudang;
  var id_kategori = req.body.id_kategori;
  var sql = `UPDATE barang SET kode_barang="${new_kode_barang}", nama_barang="${barang}", berat_barang="${berat_barang}", harga_modal="${harga_modal}", stok_bsi="${stok_bsi}", stok_toko="${stok_toko}", stok_gudang="${stok_gudang}", id_kategori="${id_kategori}" WHERE kode_barang="${kode_barang}";`;
  db.query(sql, function(err, result){
    if (err){
      res.status(500).send({ error: 'Gagal Update Data Barang'})
    }
    res.json({'status':'Sukses Update Barang'})
  })

})

router.delete('/hapus/:kode_barang', function(req, res, next) {
  var kode_barang = req.params.kode_barang;
  var sql = `DELETE FROM barang WHERE kode_barang="${kode_barang}";`;
  db.query(sql, function(err, result) {
    if(err){
      res.status(500).send({error: 'Gagal Hapus Data Barang'})
    }
    res.json({'status':'Berhasil Hapus Data Barang'})
  })

})

module.exports = router;
