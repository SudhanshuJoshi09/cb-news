const express = require('express');
const search = require('./routes/articles');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use('/search', search);

app.post('*', (req, resp) => {
    const error = {
        error: 'Resource Not Found',
        code: 404,
        message: 'The page you have requested does not exist.' ,
    }
    resp.status(404).json(error);
});

app.get('*', (req, resp) => {
    const error = {
        error: 'Resource Not Found',
        code: 404,
        message: 'The page you have requested does not exist.' ,
    }
    resp.status(404).json(error);
});

app.listen(port, async () => {
    console.log(`News API running on port : ${port}`);
});