var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  var sql =`SELECT * FROM kategori;`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(rows)
  })
})

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var sql =`SELECT * FROM kategori where id_kategori = ${id}`;
  db.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(row[0])
  })
})

router.post('/baru', function(req, res, next) {
  var kategori = req.body.nama_kategori;
  var sql = `INSERT INTO kategori (kategori) values ("${kategori}");`
  db.query(sql, function(err, result){
    if (err) {
      res.status(500).send({ error: 'Gagal Input Data Kategori'})
    }
    res.json({'status':'Input data Kategori Berhasil', id: result.insertId})
  })

})

router.put('/update/:id', function(req, res, next) {
  var id = req.params.id;
  var kategori = req.body.nama_kategori;
  var sql = `UPDATE kategori SET kategori="${kategori}" WHERE id_kategori=${id};`
  db.query(sql, function(err, result){
    if (err){
      res.status(500).send({ error: 'Gagal Update Kategori'})
    }
    res.json({'status':'Sukses Update Kategori'})
  })

})

router.delete('/hapus/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = `DELETE FROM kategori WHERE id_kategori=${id};`
  db.query(sql, function(err, result) {
    if(err){
      res.status(500).send({error: 'Gagal Hapus Kategori'})
    }
    res.json({'status':'Berhasil Hapus Kategori'})
  })

})

module.exports = router;
