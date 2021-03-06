var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var kategoriRouter = require('./routes/kategori');
var roleRouter = require('./routes/role');
var kurirRouter = require('./routes/kurir');
var sumberRouter = require('./routes/sumber');
var barangRouter = require('./routes/barang');
var transaksiRouter = require('./routes/transaksi');
var detail_transaksiRouter = require('./routes/detail_transaksi');
var iklanRouter = require('./routes/iklan');
var riwayat_iklanRouter = require('./routes/riwayat_iklan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/kategori', kategoriRouter);
app.use('/role', roleRouter);
app.use('/kurir', kurirRouter);
app.use('/sumber', sumberRouter);
app.use('/barang', barangRouter);
app.use('/transaksi', transaksiRouter);
app.use('/detail_transaksi', detail_transaksiRouter);
app.use('/iklan', iklanRouter);
app.use('/riwayat_iklan', riwayat_iklanRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
