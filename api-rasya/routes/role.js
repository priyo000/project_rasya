var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  var sql =`SELECT * FROM role;`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(rows)
  })
})

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var sql =`SELECT * FROM role where idrole = ${id}`;
  db.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(row[0])
  })
})

router.post('/baru', function(req, res, next) {
  var role = req.body.nama_role;
  var sql = `INSERT INTO role (nama_role) values ("${role}");`
  db.query(sql, function(err, result){
    if (err) {
      res.status(500).send({ error: 'Gagal Input Data Data Role'})
    }
    res.json({'status':'Input data Role Berhasil', id: result.insertId})
  })

})

router.put('/update/:id', function(req, res, next) {
  var id = req.params.id;
  var role = req.body.nama_role;
  var sql = `UPDATE role SET nama_role="${role}" WHERE idrole=${id};`
  db.query(sql, function(err, result){
    if (err){
      res.status(500).send({ error: 'Gagal Update Data Role'})
    }
    res.json({'status':'Sukses Update Role'})
  })

})

router.delete('/hapus/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = `DELETE FROM role WHERE idrole=${id};`
  db.query(sql, function(err, result) {
    if(err){
      res.status(500).send({error: 'Gagal Hapus Data Role'})
    }
    res.json({'status':'Berhasil Hapus Data Role'})
  })

})

module.exports = router;
