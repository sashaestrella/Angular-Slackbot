const connection = require("../database")

module.exports = {
    obtenerRespuestasDeUsuarios() {
        return new Promise((resolve, reject) => {
            let conexion = connection.iniciarConexion();
            conexion.connect((err) => {
                if (err) return;
                else conexion.query('select * from Usuario_pregunta;', (err, resultados) => {
                    if (err) {
                        reject(err);
                    } else {
                        conexion.end((err) => {
                            console.log("se ha cerrado la conexión");
                            resolve(resultados);
                        })
                    } 
                }); 
            })
        });
    },
}