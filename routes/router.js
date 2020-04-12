const express = require('express');

const router = express.Router();

const xml = require('xml');

const estimator = require('../utils/estimator');

const xmlBuilder = require('xmlbuilder');

const fs = require('fs');

const path = require('path');

router.post('/', (req, res) => {
        const data = req.body;


        const response = estimator(data);


        // res.emit();
        res.send(response);

    })
    .post('/json', (req, res) => {
        const data = req.body;


        const response = estimator(data);

        // res.emit('finish');
        res.send(response);

    })
    .post('/xml', (req, res) => {
        const data = req.body;

        const response = estimator(data);

        res.setHeader('Content-Type', 'application/xml');

        const doc = xmlBuilder.create({
            response
        }).end({
            pretty: true
        });

        // res.emit('finish');
        res.send(doc);

    })
    .get('/logs', (req, res) => {
        const logData = fs.readFileSync(path.join(__dirname, '..', 'log.txt'), 'utf-8');

        console.log(typeof logData);

        // console.log(typeof (JSON.stringify(logData)));
        res.setHeader('Content-Type', 'text/plain');
        res.send(logData);
    });


module.exports = router;
