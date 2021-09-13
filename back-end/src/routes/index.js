const { Router } = require("express");
const router = Router();
const questionModel = require('../models/question');
const userModel = require('../models/user');

/* Users */
router.get('/obtenerRespuestasUsuarios', function (req, res, next) {
    userModel
        .obtenerRespuestasDeUsuarios()
        .then(users => {
            console.log("se obtuvieron los usuarios: ",users);
            return res.send(users);
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo las respuestas de los usuarios");
        });
})

/* Questions */
router.delete('/eliminarPregunta/:id', function (req, res, next) {
    questionModel
        .eliminarPregunta(req.params.id)
        .then(quest => {
            console.log("se eliminó la pregunta ",req.params.id);
        })
        .catch(err => {
            return res.status(500).send(`Error eliminando la pregunta: ${req.params.id}`);
        });
})

router.get('/obtenerPreguntas', function (req, res, next) {
    questionModel
        .obtenerPreguntas()
        .then(quest => {
            console.log("se obtuvieron las preguntas", quest);
            return res.send(quest);
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo las preguntas de la DB");
        });
});

router.get('/obtenerRespuestas', function (req, res, next) {
    questionModel
        .obtenerRespuestas()
        .then(quest => {
            console.log("se obtuvieron las respuestas", quest);
            return res.send(quest);
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo las respuestas de la DB");
        });
});

router.put('/editarPregunta/:id', function (req, res, next) {
    const { descripcion_pregunta } = req.body;
    if (!descripcion_pregunta) {
        return res.status(500).send("No hay valores ingresados");
    }

    questionModel
        .editarDescripcionPregunta(req.params.id, descripcion_pregunta)
        .then(quest => {
            console.log("se editó la descripcion de la pregunta");
            return res.status(201).send()
        })
        .catch(err => {
            return res.status(500).send(`Error editando la pregunta: ${req.params.id}`);
        });
});


router.put('/editarRespuestas/:id', function (req, res, next) {
    const { ids, answers, respuesta_correcta } = req.body;
    if (!answers || !ids || !respuesta_correcta) {
        return res.status(500).send("No hay valores ingresados");
    }

    questionModel
        .editarRespuestaCorrectaPregunta(req.params.id, respuesta_correcta)
        .then(quest => {
            console.log("se editó la respuesta de la pregunta");
            for (var i = 0; i < 4; i++) {
                questionModel
                    .editarRespuesta(req.params.id, ids[i], answers[i].descripcion_respuesta)
                    .then(quest => {
                        console.log("se editó la pregunta");
                        return res.status(201).send()
                    })
                    .catch(err => {
                        return res.status(500).send(`Error editando las respuestas de la pregunta: ${req.params.id}`);
                    });
            }
        })
        .catch(err => {
            return res.status(500).send(`Error editando la respuesta correcta de la pregunta: ${req.params.id}`);
        });
});

router.post('/agregarPregunta', function (req, res, next) {
    const { question, answers } = req.body;

    if (!question) {
        return res.status(500).send("No hay valores ingresados para la pregunta");
    } else if(!answers) {
        return res.status(500).send("No hay valores ingresados para las respuestas");
    }

    questionModel
        .insertarPregunta(question.descripcion_pregunta, question.respuesta_correcta)
        .then(quest => {
            console.log("se agregó la pregunta!!", quest);
            questionModel
                .insertarRespuesta(quest, answers[0].descripcion_respuesta, false)
                .then(res1 => {
                    console.log("se agregó la respuesta", res1.id, "!!");
                    console.log('esUltima? ', res1.esUltima)
                questionModel
                    .insertarRespuesta(quest, answers[1].descripcion_respuesta, false)
                    .then(res2 => {
                        console.log("se agregó la respuesta", res2.id, "!!");
                        console.log('esUltima? ', res2.esUltima)
                    questionModel
                        .insertarRespuesta(quest, answers[2].descripcion_respuesta, false)
                        .then(res3 => {
                            console.log("se agregó la respuesta", res3.id, "!!");
                            console.log('esUltima? ', res3.esUltima)
                        questionModel
                            .insertarRespuesta(quest, answers[3].descripcion_respuesta, true)
                            .then(res4 => {
                                console.log("se agregó la respuesta", res4.id, "!!");
                                console.log('esUltima? ', res4.esUltima)
                                if ( res4.esUltima ){
                                    console.log("Vamos a responder con exito")
                                    //return res.status(201).send()
                                    return res.send(answers);
                                }
                            })
                            .catch(err => {
                                console.error(err);
                                eliminarPregunta(quest);
                                return res.status(500).send(`Error insertando la respuesta: ${answers[3].descripcion_respuesta}`);
                            });
                        })
                        .catch(err => {
                            console.error(err);
                            eliminarPregunta(quest);
                            return res.status(500).send(`Error insertando la respuesta: ${answers[2].descripcion_respuesta}`);
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        eliminarPregunta(quest);
                        return res.status(500).send(`Error insertando la respuesta: ${answers[1].descripcion_respuesta}`);
                    });
                })
            .catch(err => {
                console.error(err);
                eliminarPregunta(quest);
                return res.status(500).send(`Error insertando la respuesta:  ${answers[0].descripcion_respuesta}`);
            });
            
        })
        .catch(err => {
            return res.status(500).send(`Error insertando la pregunta: ${question.descripcion_pregunta}`);
        });
});

function eliminarPregunta(id, res) {
    questionModel
        .eliminarPregunta(id)
        .then(quest => {
            console.log("se eliminó la pregunta: ", id);
        })
        .catch(err => {
            return res.status(500).send(`Error eliminando la pregunta: ${quest}`);
        });
}

module.exports = router;