const express = require('express');

const app = express();

const fs = require('fs');

const path = require('path');

const routes = require('./routes/router');

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
