var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/:id_transaksi', function(req, res, next) {
  var sql =`SELECT dt.*,b.nama_barang,b.berat_barang FROM detail_transaksi AS dt INNER JOIN barang AS b ON b.kode_barang=dt.kode_barang WHERE id_transaksi = "${id_transaksi}";`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(rows)
  })
})


router.post('/baru', function(req, res, next) {
  var id_transaksi = req.body.id_transaksi;
  var kode_barang = req.body.kode_barang;
  var kuantitas = req.body.kuantitas;
  var harga = req.body.harga;
  // var cek = `SELECT COUNT(id_transaksi) FROM transaksi WHERE status="draft";`;
  var sql = `INSERT INTO detail_transaksi (id_transaksi, kode_barang, kuantitas, harga) VALUES ('${id_transaksi}', '${kode_barang}', '${$kuantitas}', '${harga}');`;
  db.query(cek, function(err, result){
    if (err) {
      res.status(500).send({ error: 'Gagal Input Data Transaksi'})
    }
    res.json({'status':'Tambah Barang Transaksi Berhasil'})
  })

})

router.delete('/hapus/:id_detail_transaksi', function(req, res, next) {
  var id_detail_transaksi = req.params.id_detail_transaksi;
  var sql = `DELETE FROM detail_transaksi WHERE id_detail_transaksi="${id_detail_transaksi}";`;
  db.query(sql, function(err, result) {
    if(err){
      res.status(500).send({error: 'Gagal Hapus Data Barang'})
    }
    res.json({'status':'Berhasil Hapus Barang dari Transaksi'})
  })

})

module.exports = router;
