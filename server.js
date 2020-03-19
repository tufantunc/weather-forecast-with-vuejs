const express = require('express');
const path = require('path');

const app = express();
app.use('/static', express.static('static'));
app.use('/dist', express.static('dist'));

const port = process.env.PORT || 3000;

app.get('*', (req, res) => {
    res.sendFile(path.resolve('./index.html'));
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});
