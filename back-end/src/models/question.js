const conexion = require("../database")
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
    },
    insertarPregunta(textoPregunta, respuestaPregunta) {
        return new Promise((resolve, reject) => {
            let conexion = this.iniciarConexion();
            conexion.connect((err) => {
                if (err) return;
                else conexion.query('insert into Preguntas (descripcion_pregunta,respuesta_correcta) values ("' + textoPregunta + '","' + respuestaPregunta + '");', (err, resultados) => {
                    if (err) {
                        reject(err);
                    } else {
                        conexion.end((err) => {
                            console.log("se ha cerrado la conexión");
                            resolve(resultados.insertId);
                        })
                    } 
                });
            })
        });
    },
    insertarRespuesta(id, textoRespuesta, esUltima) {
        return new Promise((resolve, reject) => {
            let conexion = this.iniciarConexion();
            conexion.connect((err) => {
                if (err) return;
                else conexion.query('insert into Respuestas (id_pregunta,descripcion_respuesta) values (' + id + ',"' + textoRespuesta + '");', (err, resultados) => {
                    if (err) {
                        reject(err);
                    } else {
                        if(esUltima) {
                            conexion.end((err) => {
                                console.log("se ha cerrado la conexión");
                                resolve({id: resultados.insertId, esUltima: esUltima});
                            })  
                        } else {
                            resolve({id: resultados.insertId, esUltima: esUltima});
                        }
                    } 
                });
            })
        });
    },
    obtenerPreguntas() {
        return new Promise((resolve, reject) => {
            let conexion = this.iniciarConexion();
            conexion.connect((err) => {
                if (err) return;
                else conexion.query('select * from Preguntas;', (err, resultados) => {
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
    obtenerRespuestas() {
        return new Promise((resolve, reject) => {
            let conexion = this.iniciarConexion();
            conexion.connect((err) => {
                if (err) return;
                else conexion.query('select * from Respuestas;', (err, resultados) => {
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
/*     obtenerRespuestasDePregunta(idPregunta) {
        return new Promise((resolve, reject) => {
            conexion.query('select * from Respuestas r join Preguntas p on p.id_pregunta = r.id_pregunta where r.id_pregunta = '+ idPregunta +';', (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
            });
        });
    }, */
    editarDescripcionPregunta(idPregunta, descripcion) {
        return new Promise((resolve, reject) => {
            let conexion = this.iniciarConexion();
            conexion.connect((err) => {
                if (err) return;
                else conexion.query('update Preguntas p set descripcion_pregunta = "' + descripcion + '" where p.id_pregunta = ' + idPregunta +';', (err, resultados) => {
                    if (err) {
                        reject(err);
                    } else {
                        conexion.end((err) => {
                            console.log("se ha cerrado la conexión");
                            resolve(resultados.insertId);
                        })
                    } 
                })
            });
        });
    },
    editarRespuestaCorrectaPregunta(idPregunta, respuesta) {
        return new Promise((resolve, reject) => {
            let conexion = this.iniciarConexion();
            conexion.connect((err) => {
                if (err) return;
                else conexion.query('update Preguntas p set respuesta_correcta = "' + respuesta + '" where p.id_pregunta = ' + idPregunta +';', (err, resultados) => {
                    if (err) {
                        reject(err);
                    } else {
                        conexion.end((err) => {
                            console.log("se ha cerrado la conexión");
                            resolve(resultados.insertId);
                        })
                    } 
                })
            });
        });
    },
    eliminarPregunta(idPregunta) {
        return new Promise((resolve, reject) => {
            let conexion = this.iniciarConexion();
            conexion.connect((err) => {
                if (err) return;
                else conexion.query('delete from Preguntas where id_pregunta = '+ idPregunta +';', (err, resultados) => {
                    if (err) {
                        reject(err);
                    } else {
                        conexion.end((err) => {
                            console.log("se ha cerrado la conexión");
                            resolve(resultados.insertId);
                        })
                    } 
                })
            });
        });
    },
    editarRespuesta(idPregunta, id, respuesta) {
        return new Promise((resolve, reject) => {
            let conexion = this.iniciarConexion();
            conexion.connect((err) => {
                if (err) return;
                else conexion.query('update Respuestas r set descripcion_respuesta = "' + respuesta + '" where r.id_respuesta = '+ id + ';', (err, resultados) => {
                    if (err) {
                        reject(err);
                    } else {
                        conexion.end((err) => {
                            console.log("se ha cerrado la conexión");
                            resolve(resultados.insertId);
                        })
                    } 
                })
            });
        });
    }
}