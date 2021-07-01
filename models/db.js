const mysql = require('mysql2/promise');

//const mysql = require('mysql2');
const config = require('../config/config_db.js');

const conn = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database:config.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/*
const conn = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database:config.DB
})
*/
/*
conn.connect ((err) => {
  if (err) {    
    console.log (err +'____Erreur de connexion à Db')
    return
  }
  console.log ('Connexion établie')
})

*/
/*
let createUser = 'CREATE TABLE IF NOT EXISTS user(
  id INT auto_increment, email VARCHAR(255), passwordINT, pseudo VARCHAR(255), role VARCHAR(255),date_add VARCHAR(255), date_update VARCHAR(255), primary key (id))'
conn.execute(createUser)
*/
module.exports =  conn

