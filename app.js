const express = require('express');

const app = express();

const fs = require('fs');

const path = require('path');

const routes = require('./routes/router');

const cors = require('cors');

app.use(cors());

app.use((req, res, next) => {
    const start = new Date();
    res.on('finish', function () {
        const end = new Date();
        const duration = end - start;

        if (!fs.existsSync(path.join(__dirname, 'log.txt'))) {
            fs.writeFileSync(path.join(__dirname, 'log.txt'), "");
        }

        const log = `${req.method}\t\t${req.path}\t\t${res.statusCode}\t\t${duration}ms`;

        if (res.statusCode === 200) {
            fs.appendFileSync(path.join(__dirname, 'log.txt'), log + '\n', 'utf8');
        }
    });
    next();
});

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use((req, res, next) => {
    const info = `${req.method}\t\t${req.path}\t\t${res.statusCode}\t\t${res.elapsedTime}`;

    console.log(info);

    if (req.statusCode === 200) {
        fs.writeFile(path.join(__dirname, 'log.txt'), info);
    }

    next();
});

app.use('/api/v1/on-covid-19', routes);



const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`api is live on port: ${PORT}`);
});
