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
    obtenerRespuestasDePregunta(idPregunta) {
        return new Promise((resolve, reject) => {
            conexion.query('select * from Respuestas where id_pregunta = '+ idPregunta +';', (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
            });
        });
    },
    editarPregunta(idPregunta, descripcion, respuestaCorrecta) {
        return new Promise((resolve, reject) => {
            conexion.query('update Preguntas set descripcion_pregunta = "' + descripcion + '", respuesta_correcta = "' + respuestaCorrecta + '" where id_pregunta = ' + idPregunta +';', (err, resultados) => {
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
            conexion.query('update Respuestas set descripcion_respuesta = "' + respuesta + '" where id_respuesta = '+ id + ';', (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados.insertId);
            });
        });
    }
}