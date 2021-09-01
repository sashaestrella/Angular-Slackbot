const { Router } = require("express");
const router = Router();
const question = require('../models/question');
let idQuestion = 0;
let idAnswer = 0;

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