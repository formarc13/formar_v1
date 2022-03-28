const express = require('express');
const app = express();
const path = require('path');
const process = require('process');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

/* Enrutadores */
const indexRouter = require('./routes/indexRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const adminRouter = require('./routes/adminRouter');

app.use(express.static(path.join(__dirname, '../public')))

/* Views config */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"))


/* Middlewares de Rutas */
app.use('/', indexRouter) // HOME - Contact 
app.use('/productos', productsRouter) // Listado, detalle
app.use('/usuarios', usersRouter) // login, registro, perfil
app.use('/admin', adminRouter) // administrador

app.listen(PORT, () => console.log(`
Server listen port ${PORT}
http://localhost:${PORT}
`))