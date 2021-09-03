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
    },
    obtenerPreguntas() {
        return new Promise((resolve, reject) => {
            conexion.query('select * from Preguntas;', (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
            });
        });
    },
    obtenerRespuestas() {
        return new Promise((resolve, reject) => {
            conexion.query('select * from Respuestas;', (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
            });
        });
    },
    obtenerRespuestasDePregunta(idPregunta) {
        return new Promise((resolve, reject) => {
            conexion.query('select * from Respuestas r join Preguntas p on p.id_pregunta = r.id_pregunta where r.id_pregunta = '+ idPregunta +';', (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
            });
        });
    },
    editarDescripcionPregunta(idPregunta, descripcion) {
        return new Promise((resolve, reject) => {
            conexion.query('update Preguntas p set descripcion_pregunta = "' + descripcion + '" where p.id_pregunta = ' + idPregunta +';', (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
            });
        });
    },
    editarRespuestaCorrectaPregunta(idPregunta, respuesta) {
        return new Promise((resolve, reject) => {
            conexion.query('update Preguntas p set respuesta_correcta = "' + respuesta + '" where p.id_pregunta = ' + idPregunta +';', (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
            });
        });
    },
    eliminarPregunta(idPregunta) {
        return new Promise((resolve, reject) => {
            conexion.query('delete from Preguntas where id_pregunta = '+ idPregunta +';', (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
            });
        });
    },
    editarRespuesta(idPregunta, id, respuesta) {
        return new Promise((resolve, reject) => {
            conexion.query('update Respuestas r set descripcion_respuesta = "' + respuesta + '" where r.id_respuesta = '+ id + ';', (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados.insertId);
            });
        });
    }
}