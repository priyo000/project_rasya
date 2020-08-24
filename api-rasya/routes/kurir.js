var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  var sql =`SELECT * FROM kurir;`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(rows)
  })
})

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var sql =`SELECT * FROM kurir where id_kurir = ${id}`;
  db.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(row[0])
  })
})

router.post('/baru', function(req, res, next) {
  var kurir = req.body.nama_kurir;
  var sql = `INSERT INTO kurir (nama_kurir) values ("${kurir}");`
  db.query(sql, function(err, result){
    if (err) {
      res.status(500).send({ error: 'Gagal Input Data Data Kurir'})
    }
    res.json({'status':'Input data Kurir Berhasil', id: result.insertId})
  })

})

router.put('/update/:id', function(req, res, next) {
  var id = req.params.id;
  var kurir = req.body.nama_kurir;
  var sql = `UPDATE kurir SET nama_kurir="${kurir}" WHERE id_kurir=${id};`
  db.query(sql, function(err, result){
    if (err){
      res.status(500).send({ error: 'Gagal Update Data Kurir'})
    }
    res.json({'status':'Sukses Update Kurir'})
  })

})

router.delete('/hapus/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = `DELETE FROM kurir WHERE id_kurir=${id};`
  db.query(sql, function(err, result) {
    if(err){
      res.status(500).send({error: 'Gagal Hapus Data Kurir'})
    }
    res.json({'status':'Berhasil Hapus Data Kurir'})
  })

})

module.exports = router;
