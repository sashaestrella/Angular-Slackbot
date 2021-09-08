const { Router } = require("express");
const router = Router();
const questionModel = require('../models/question');

router.delete('/eliminarPregunta/:id', function (req, res, next) {
    questionModel
        .eliminarPregunta(req.params.id)
        .then(quest => {
            console.log("se eliminó la pregunta");
        })
        .catch(err => {
            return res.status(500).send("Error eliminando la pregunta");
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
            return res.status(500).send("Error obteniendo las preguntas");
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
            return res.status(500).send("Error obteniendo las respuestas");
        });
});

router.get('/obtenerRespuestas/:id', function (req, res, next) {
    questionModel
        .obtenerRespuestasDePregunta(req.params.id)
        .then(quest => {
            console.log("se obtuvieron las respuestas", quest);
            return res.send(quest);
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo las respuestas");
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
            return res.status(500).send("Error editando la pregunta");
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
                        return res.status(500).send("Error editando la pregunta");
                    });
            }
        })
        .catch(err => {
            return res.status(500).send("Error editando la pregunta");
        });
});

router.post('/agregarPregunta', function (req, res, next) {
    console.log(req.body);
    const { question, answers } = req.body;

    if (!question || answers.length <= 0) {
        return res.status(500).send("No hay valores ingresados");
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
                                return res.status(500).send("Error insertando la respuesta");
                            });
                        })
                        .catch(err => {
                            console.error(err);
                            return res.status(500).send("Error insertando la respuesta");
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        return res.status(500).send("Error insertando la respuesta");
                    });
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500).send("Error insertando la respuesta");
                });
            
        })
        .catch(err => {
            return res.status(500).send("Error insertando la pregunta");
        });
});

module.exports = router;