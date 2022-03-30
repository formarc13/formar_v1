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

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/* Views config */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"));


/* Middlewares de Rutas */
app.use('/', indexRouter); // HOME - Contact 
app.use('/productos', productsRouter); // Listado, detalle
app.use('/usuarios', usersRouter); //Login, registro, perfil
app.use('/admin', adminRouter); // Admin, ABM Productos, ABM Projectos

app.listen(PORT, () => console.log(`
Server listen port ${PORT}
http://localhost:${PORT}
`));