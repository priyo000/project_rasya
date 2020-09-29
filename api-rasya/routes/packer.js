var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/:packer', function(req, res, next) {
  var id = req.params.packer;
  var sql =`SELECT t.*,u.username,u.no_hp,k.nama_kurir,s.sumber,p.username AS nama_packer FROM transaksi AS t INNER JOIN user as u ON u.id_user=t.id_user INNER JOIN kurir AS k ON k.id_kurir=t.id_kurir INNER JOIN sumber AS s ON s.id_sumber = t.id_sumber INNER JOIN user as p ON p.id_user=t.packer WHERE packer="${packer}"`;
  db.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(row[0])
  })
})

router.put('/status/:id/:status', function(req, res, next) {
  var id = req.params.id;
  var status = req.params.status;
  var sql = `UPDATE transaksi SET status="${status}",packer="${packer}",waktu_packing=NOW() WHERE id_transaksi="${id}";`;
  db.query(sql, function(err, result){
    if (err){
      res.status(500).send({ error: 'Gagal Update Data Status Transaksi'})
    }
    res.json({'status':'Sukses Update Status Transaksi'})
  })
})


module.exports = router;
