'use strict'

var express = require('express'),
	favicon = require('serve-favicon'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	restFul = require('express-method-override')('_method'),
	routes = require('./routes'),
	middlewareParamsSettings = require('./middlewares/paramsSettings'),
	// middlewareFunction = require('./middlewares/autentication'),
    cors = require('cors'),
	faviconURL = `${__dirname}/public/img/node-favicon.png`,
	publicDir = express.static(`${__dirname}/public`),
	viewDir = `${__dirname}/views`,
	port = (process.env.PORT || 3001),
    	app = express()

app
	.set('views', viewDir)
	.set('view engine', 'jade')
	.set('port', port)
	.use(cors())
	.use( favicon(faviconURL) )
	// parse application/json
	.use( bodyParser.json() )
	// parse application/x-www-form-urlencoded
	.use( bodyParser.urlencoded({extended: false}) )
	.use(restFul)
	.use( morgan('dev') )
	// .use(middlewareFunction)
	.use(middlewareParamsSettings)
	.use(routes)
	
	

module.exports = app
