const express = require('express');

const router = express.Router();

const xml = require('xml');

const estimator = require('../utils/estimator');

router.post('/', (req, res) => {
        const {
            data
        } = req;

        console.log(req);


        // eslint-disable-next-line no-console
        console.log(data);

        // eslint-disable-next-line no-console
        const response = estimator(data);

        res.send(response);
    })
    .post('/json', (req, res) => {
        const {
            data
        } = req.body;


        // eslint-disable-next-line no-console
        console.log(data);

        // eslint-disable-next-line no-console
        const response = estimator(data);

        res.send(response);
    })
    .post('/xml', (req, res) => {
        const {
            data
        } = req.body;

        // eslint-disable-next-line no-console
        const response = estimator(data);

        res.setHeader('Content-Type', 'application/xml');
        res.send(xml(response));
    });
// .get('/logs', (req, res) => {

// });


module.exports = router;
