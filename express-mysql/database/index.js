const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456a',
    database: 'purwadhika'
})

module.exports=db