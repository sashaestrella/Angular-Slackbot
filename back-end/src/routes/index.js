const { Router } = require("express");
const router = Router();
const question = require('../models/question');
let idQuestion = 0;
let idAnswer = 0;

router.delete('/eliminarPregunta/:id', function (req, res, next) {
    question
        .eliminarPregunta(req.params.id)
        .then(quest => {
            console.log("se eliminó la pregunta");
        })
        .catch(err => {
            return res.status(500).send("Error eliminando la pregunta");
        });
})

router.get('/obtenerPreguntas', function (req, res, next) {
    question
        .obtenerPreguntas()
        .then(quest => {
            console.log("se obtuvieron las preguntas", quest);
            return res.send(quest);
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo las preguntas");
        });
});

router.get('/obtenerRespuestas/:id', function (req, res, next) {
    question
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
    const { descripcion_pregunta, respuesta_correcta } = req.body;
    if (!descripcion_pregunta || !respuesta_correcta) {
        return res.status(500).send("No hay valores ingresados");
    }

    question
        .editarPregunta(req.params.id, descripcion_pregunta, respuesta_correcta)
        .then(quest => {
            console.log("se editó la pregunta");
        })
        .catch(err => {
            return res.status(500).send("Error editando la pregunta");
        });
});


router.put('/editarRespuestas/:id', function (req, res, next) {
    const { ids, answers } = req.body;
    if (!answers || !ids) {
        return res.status(500).send("No hay valores ingresados");
    }

    question
        .editarRespuestas(req.params.id, ids, answers)
        .then(quest => {
            console.log("se editó la pregunta");
        })
        .catch(err => {
            return res.status(500).send("Error editando la pregunta");
        });
});

router.post('/agregarPregunta', function (req, res, next) {
    const { descripcion_pregunta, respuesta_correcta } = req.body;
    if (!descripcion_pregunta || !respuesta_correcta) {
        return res.status(500).send("No hay valores ingresados");
    }

    idQuestion++;

    question
        .insertarPregunta(idQuestion, descripcion_pregunta, respuesta_correcta)
        .then(quest => {
            console.log("se agregó la pregunta!!");
        })
        .catch(err => {
            return res.status(500).send("Error insertando la pregunta");
        });
});

router.post('/agregarRespuesta', function (req, res, next) {
    const { descripcion_respuesta } = req.body;
    if (!descripcion_respuesta) {
        return res.status(500).send("No hay valores ingresados");
    }

    idAnswer++;

    question
        .insertarRespuesta(idAnswer, idQuestion, descripcion_respuesta)
        .then(quest => {
            console.log("se agregó la respuesta!!");
        })
        .catch(err => {
            return res.status(500).send("Error insertando la respuesta");
        });
});

module.exports = router;