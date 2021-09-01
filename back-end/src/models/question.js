const conexion = require("../database")

module.exports = {
    insertarPregunta(id, textoPregunta, respuestaPregunta) {
        return new Promise((resolve, reject) => {
            conexion.query('insert into Preguntas values ('+ id + ',"' + textoPregunta + '","' + respuestaPregunta + '");', (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
            });
        });
    },
    insertarRespuesta(idRespuesta, id, textoRespuesta) {
        return new Promise((resolve, reject) => {
            conexion.query('insert into Respuestas values ('+ idRespuesta + ',' + id + ',"' + textoRespuesta + '");', (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
            });
        });
    } 
}