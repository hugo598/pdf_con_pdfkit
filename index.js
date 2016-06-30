'use strict';
var express 	= require('express');
var app 		= express();
var swig  		= require('swig');
var bodyParser 	= require('body-parser');
var routes 		= require('./routes');
var path 		= require('path');
var port 		= 3001;

app.use( bodyParser.urlencoded( { extended : false } ) );
app.use( bodyParser.json() );

app.engine('html', swig.renderFile);
//app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults( { cache: false} , { loader : swig.loaders.fs( path.join( __dirname, 'views' ) )});

/* ARCHIVOS ESTATICOS */
app.use( express.static( __dirname + '/public', { redirect : true } ) );


app.listen(port, function ()
{
	console.log('Se inicio el servidor en el puerto : ' + port );
});

app.use('/', routes);
