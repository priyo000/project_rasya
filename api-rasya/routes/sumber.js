var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  var sql =`SELECT * FROM sumber;`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(rows)
  })
})

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var sql =`SELECT * FROM sumber where id_sumber = ${id}`;
  db.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(row[0])
  })
})

router.post('/baru', function(req, res, next) {
  var sumber = req.body.sumber;
  var kategori = req.body.kategori;
  var sql = `INSERT INTO sumber (sumber,kategori) values ("${sumber}","${kategori}");`
  db.query(sql, function(err, result){
    if (err) {
      res.status(500).send({ error: 'Gagal Input Data Data Sumber'})
    }
    res.json({'status':'Input data Sumber Berhasil', id: result.insertId})
  })

})

router.put('/update/:id', function(req, res, next) {
  var id = req.params.id;
  var sumber = req.body.sumber;
  var kategori = req.body.kategori;
  var sql = `UPDATE sumber SET sumber="${sumber}", kategori="${kategori}" WHERE id_sumber=${id};`
  db.query(sql, function(err, result){
    if (err){
      res.status(500).send({ error: 'Gagal Update Data Sumber'})
    }
    res.json({'status':'Sukses Update Sumber'})
  })

})

router.delete('/hapus/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = `DELETE FROM sumber WHERE id_sumber=${id};`
  db.query(sql, function(err, result) {
    if(err){
      res.status(500).send({error: 'Gagal Hapus Data Sumber'})
    }
    res.json({'status':'Berhasil Hapus Data Sumber'})
  })

})

module.exports = router;
