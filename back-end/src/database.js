const mysql = require('mysql');

let createConnection = mysql.createConnection({
    host: 'docker-qa',
    user: 'root',
    password: '',
    database: 'slackbot',
});

createConnection.connect((error) => {
    if(error) {
        console.log(error);
        return;
    }
    console.log("Conectado a la base de datos");
})

module.exports = createConnection;
