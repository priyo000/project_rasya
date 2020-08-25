var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  var sql =`SELECT * FROM user;`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(rows)
  })
})

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  var sql =`SELECT * FROM user where id_user = ${id}`;
  db.query(sql, function(err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Gagal'})
    }
    res.json(row[0])
  })
})

router.post('/baru', function(req, res, next) {
  var username = req.body.username;
  var idrole = req.body.idrole;
  var password = bcrypt.hashSync(req.body.password,salt);
  var no_hp = req.body.no_hp;
  var sql = `INSERT INTO user (username,idrole,password,no_hp) values ("${username}","${idrole}","${password}","${no_hp}");`
  db.query(sql, function(err, result){
    if (err) {
      res.status(500).send({ error: 'Gagal Input Data Data User'})
    }
    res.json({'status':'Input data User Berhasil', id: result.insertId})
  })

})

router.put('/update/:id', function(req, res, next) {
  var id = req.params.id;
  var user = req.body.username;
  var idrole = req.body.idrole;
  var password = bcrypt.hashSync(req.body.password,salt);
  var no_hp = req.body.no_hp;
  var sql = `UPDATE user SET username="${user}", idrole="${idrole}", password="${password}", no_hp="${no_hp}" WHERE id_user=${id};`
  db.query(sql, function(err, result){
    if (err){
      res.status(500).send({ error: 'Gagal Update Data User'})
    }
    res.json({'status':'Sukses Update User'})
  })

})

router.delete('/hapus/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = `DELETE FROM user WHERE id_user=${id};`
  db.query(sql, function(err, result) {
    if(err){
      res.status(500).send({error: 'Gagal Hapus Data User'})
    }
    res.json({'status':'Berhasil Hapus Data User'})
  })

})

module.exports = router;
