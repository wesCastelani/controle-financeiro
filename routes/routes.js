const express = require('express');
const app = express();

const service = require('../services/transactionService');

app.post('/create', service.create);
app.get('', service.findPeriod);
app.get('/find', service.findDesc);
app.patch('/update/:id', service.update);
app.delete('/remove/:id', service.remove);

module.exports = app;
