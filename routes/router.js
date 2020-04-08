const express = require('express');

const router = express.Router();

const xml = require('xml');

const estimator = require('../utils/estimator');

const xmlBuilder = require('xmlbuilder');

router.post('/', (req, res) => {
        const data = req.body;


        const response = estimator(data);

        res.send(response);
    })
    .post('/json', (req, res) => {
        const data = req.body;


        const response = estimator(data);

        res.send(response);
    })
    .post('/xml', (req, res) => {
        const data = req.body;

        const response = estimator(data);

        res.setHeader('Content-Type', 'application/xml');

        const doc = xmlBuilder.create({
            estimator: response
        }).end({
            pretty: true
        });

        res.send(doc);
    });
// .get('/logs', (req, res) => {

// });


module.exports = router;
