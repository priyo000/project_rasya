var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rasyaherbal'
});

connection.connect(function(err) {
    if (err) console.log("[mysql error]",err);
    console.log('connected!');
  });


module.exports = connection;
