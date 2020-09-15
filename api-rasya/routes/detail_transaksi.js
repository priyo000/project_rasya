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

// router.get('/:id', function(req, res, next) {
//   var id = req.params.id;
//   var sql =`SELECT t.*,u.username,u.no_hp,k.nama_kurir,s.sumber,p.username AS nama_packer FROM transaksi AS t INNER JOIN user as u ON u.id_user=t.id_user INNER JOIN kurir AS k ON k.id_kurir=t.id_kurir INNER JOIN sumber AS s ON s.id_sumber = t.id_sumber INNER JOIN user as p ON p.id_user=t.packer WHERE id_transaksi="${id}"`;
//   db.query(sql, function(err, row, fields) {
//     if (err) {
//       res.status(500).send({ error: 'Gagal'})
//     }
//     res.json(row[0])
//   })
// })

// router.get('/search', function(req, res, next) {
//   var tgl_awal = req.body.tgl_awal;
//   var tgl_akhir = req.body.tgl_akhir;
//   var id_user = req.body.id_user;
//   var id_sumber = req.body.id_sumber;
//   var id_user = req.body.id_user;
//   var pembayaran = req.body.pembayaran;
//   var status = req.body.status;
//   var sql =`SELECT t.*,u.username,u.no_hp,k.nama_kurir,s.sumber,p.username AS nama_packer,TIMEDIFF(t.waktu_packing,t.waktu_input) FROM transaksi AS t INNER JOIN user as u ON u.id_user=t.id_user INNER JOIN kurir AS k ON k.id_kurir=t.id_kurir INNER JOIN sumber AS s ON s.id_sumber = t.id_sumber INNER JOIN user as p ON p.id_user=t.packer WHERE t.waktu_input>="${tgl_awal}" AND t.waktu_input<="${tgl_akhir}" AND t.id_sumber LIKE "${id_sumber}" AND t.pembayaran LIKE "${pembayaran}" AND t.status LIKE "${status}" AND t.id_user LIKE "${id_user}" ORDER BY t.id_transaksi DESC;`;
//   db.query(sql, function(err, rows, fields) {
//     if (err) {
//       res.status(500).send({ error: 'Gagal'})
//     }
//     res.json(rows)
//   })
// })

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




// router.put('/status/:id/:status', function(req, res, next) {
//   var id = req.params.id;
//   var status = req.status;
//   var sql = `UPDATE transaksi SET status="${status}" WHERE id_transaksi="${id}";`;
//   db.query(sql, function(err, result){
//     if (err){
//       res.status(500).send({ error: 'Gagal Update Data Status Transaksi'})
//     }
//     res.json({'status':'Sukses Update Status Transaksi'})
//   })
// })
//
// router.put('/pembayaran/:id/:pembayaran', function(req, res, next) {
//   var id = req.params.id;
//   var pembayaran = req.pembayaran;
//   var bukti_tf = body.bukti_tf;
//   var sql = `UPDATE transaksi SET pembayaran="${pembayaran}", bukti_tf="${bukti_tf}" WHERE id_transaksi="${id}";`;
//   db.query(sql, function(err, result){
//     if (err){
//       res.status(500).send({ error: 'Gagal Update Data Status Pembayaran'})
//     }
//     res.json({'status':'Sukses Update Status Pembayaran'})
//   })
// })

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
