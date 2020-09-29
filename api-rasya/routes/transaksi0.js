var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  var sql =`SELECT t.*,u.username,u.no_hp,k.nama_kurir,s.sumber,p.username AS nama_packer FROM transaksi AS t INNER JOIN user as u ON u.id_user=t.id_user INNER JOIN kurir AS k ON k.id_kurir=t.id_kurir INNER JOIN sumber AS s ON s.id_sumber = t.id_sumber INNER JOIN user as p ON p.id_user=t.packer ORDER BY t.id_transaksi;`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(rows)
  })
})

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var sql =`SELECT t.*,u.username,u.no_hp,k.nama_kurir,s.sumber,p.username AS nama_packer FROM transaksi AS t INNER JOIN user as u ON u.id_user=t.id_user INNER JOIN kurir AS k ON k.id_kurir=t.id_kurir INNER JOIN sumber AS s ON s.id_sumber = t.id_sumber INNER JOIN user as p ON p.id_user=t.packer WHERE id_transaksi="${id}"`;
  db.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(row[0])
  })
})

router.get('/search', function(req, res, next) {
  var tgl_awal = req.body.tgl_awal;
  var tgl_akhir = req.body.tgl_akhir;
  var id_user = req.body.id_user;
  var id_sumber = req.body.id_sumber;
  var id_user = req.body.id_user;
  var pembayaran = req.body.pembayaran;
  var status = req.body.status;
  var sql =`SELECT t.*,u.username,u.no_hp,k.nama_kurir,s.sumber,p.username AS nama_packer,TIMEDIFF(t.waktu_packing,t.waktu_input) FROM transaksi AS t INNER JOIN user as u ON u.id_user=t.id_user INNER JOIN kurir AS k ON k.id_kurir=t.id_kurir INNER JOIN sumber AS s ON s.id_sumber = t.id_sumber INNER JOIN user as p ON p.id_user=t.packer WHERE t.waktu_input>="${tgl_awal}" AND t.waktu_input<="${tgl_akhir}" AND t.id_sumber LIKE "${id_sumber}" AND t.pembayaran LIKE "${pembayaran}" AND t.status LIKE "${status}" AND t.id_user LIKE "${id_user}" ORDER BY t.id_transaksi DESC;`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(rows)
  })
})



router.post('/baru',function(req, res, next) {
  var id_user = req.body.id_user;
  var id_sumber = req.body.id_sumber;
  var sql = `INSERT INTO transaksi (id_user,id_sumber) VALUES ("${id_user}","${id_sumber}");`;
  db.query(sql, function(err, result){
    if (err) {
      res.status(500).send({ error: 'Error new Order'})
    }
    res.json(result.insertId)
  })
})

router.put('/status/:id/:status', function(req, res, next) {
  var id = req.params.id;
  var status = req.status;
  var sql = `UPDATE transaksi SET status="${status}" WHERE id_transaksi="${id}";`;
  db.query(sql, function(err, result){
    if (err){
      res.status(500).send({ error: 'Gagal Update Data Status Transaksi'})
    }
    res.json({'status':'Sukses Update Status Transaksi'})
  })
})

router.put('/pembayaran/:id/:pembayaran', function(req, res, next) {
  var id = req.params.id;
  var pembayaran = req.pembayaran;
  var bukti_tf = body.bukti_tf;
  var sql = `UPDATE transaksi SET pembayaran="${pembayaran}", bukti_tf="${bukti_tf}" WHERE id_transaksi="${id}";`;
  db.query(sql, function(err, result){
    if (err){
      res.status(500).send({ error: 'Gagal Update Data Status Pembayaran'})
    }
    res.json({'status':'Sukses Update Status Pembayaran'})
  })
})

router.put('/simpan', function(req, res, next) {
  var id = req.params.id;
  var nama_customer = req.nama_customer;
  var alamat = body.alamat;
  var no_hp = body.no_hp;
  var pembayaran = body.pembayaran;
  var ongkir = body.ongkir;
  var id_kurir = body.id_kurir;
  var sql = `UPDATE transaksi SET waktu_input=NOW(),nama_customer="${nama_customer}",alamat="${alamat}",no_hp="${no_hp}",status="PROSES",ongkir="${ongkir}",pembayaran="${pembayaran}",id_kurir=${id_kurir} WHERE id_transaksi="${id}";`;
  db.query(sql, function(err, result){
    if (err){
      res.status(500).send({ error: 'Gagal Update Data Status Pembayaran'})
    }
    res.json({'status':'Sukses Update Status Pembayaran'})
  })
})

router.delete('/hapus/:id_transaksi', function(req, res, next) {
  var id_transaksi = req.params.id_transaksi;
  var sql = `DELETE FROM detail_transaksi WHERE id_transaksi="${id_transaksi}";`;
  var sql2 = `DELETE FROM transaksi WHERE id_transaksi="${id_transaksi}";`;
  db.query(sql, function(err, result) {
    if(err){
      res.status(500).send({error: 'Pembatalan Transaksi Gagal.'})
    }
    db.query(sql2, function(err, result) {
      if(err){
        res.status(500).send({error: 'Pembatalan Transaksi Gagal..'})
      }
      res.json({'status':'Pembatalan Transaksi Sukses'})
    })
    // res.json({'status':'Batal Membuat Transaksi'})
  })

})

module.exports = router;
