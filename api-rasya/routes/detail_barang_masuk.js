var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/:id_barang_masuk', function(req, res, next) {
  var sql =`SELECT dbm.*,b.nama_barang FROM barang_masuk AS dbm INNER JOIN barang AS b ON b.kode_barang=dbm.kode_barang WHERE id_barang_masuk = "${id_barang_masuk}";`;
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
  var sql = `INSERT INTO detail_barang_masuk (id_barang_masuk, kode_barang, kuantitas, harga) VALUES ('${id_barang_masuk}', '${kode_barang}', '${$kuantitas}', '${harga}');`;
  db.query(cek, function(err, result){
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json({'status':'Berhasil'})
  })

})

router.delete('/hapus/:id_detail_barang_masuk', function(req, res, next) {
  var id_detail_barang_masuk = req.params.id_detail_barang_masuk;
  var sql = `DELETE FROM detail_barang_masuk WHERE id_detail_barang_masuk="${id_detail_barang_masuk}";`;
  db.query(sql, function(err, result) {
    if(err){
      res.status(500).send({error: 'Gagal Hapus Data Barang'})
    }
    res.json({'status':'Berhasil Hapus Barang dari Transaksi'})
  })

})

module.exports = router;
