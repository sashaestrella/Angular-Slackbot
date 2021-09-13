const mysql = require('mysql');

module.exports = {
    iniciarConexion() {
        let createConnection = mysql.createConnection({
            host: 'docker-qa',
            user: 'root',
            password: '',
            database: 'slackbot',
        }); 
        
        return createConnection;
    }
}
