var app = require('express')();

app.use(require('./data'));
app.use(require('./verify'));
app.use(require('./get-tablas'));
app.use(require('./get-ambientes'));
app.use(require('./get-config'));
app.use(require('./crud-job'));
app.use(require('./generar-script'));
app.use(require('./get-paises'));
app.use(require('./get-def-tablas'));
app.use(require('./comparar-v2'));
app.use(require('./get-aplicaciones'));
app.use(require('./get-novedades'));
app.use(require('./get-soa')); 
module.exports = app;
