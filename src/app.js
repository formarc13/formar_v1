const express = require('express');
const app = express();
const path = require('path');
const process = require('process');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

/* Enrutadores */
const indexRouter = require('./routes/indexRouter');
const productsRouter = require('./routes/productsRouter')

app.use(express.static(path.join(__dirname, '../public')))

/* Middlewares de Rutas */
app.use('/', indexRouter) // HOME - Contact 
app.use('/productos', productsRouter) // Listado, detalle

app.listen(PORT, () => console.log(`
Server listen port ${PORT}
http://localhost:${PORT}
`))