const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = 3000

// define paths for Express config
const pathPublicDir = path.join(__dirname, '../public')
const pathViews = path.join(__dirname, '../templates/views')
const pathPartials = path.join(__dirname, '../templates/partials')

// setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', pathViews)
hbs.registerPartials(pathPartials)

// setup static dir to serve
app.use(express.static(pathPublicDir))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Gleb Gr',
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Gleb Gr',
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Gleb Gr',
		message: 'Help message',
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Gleb Gr',
		message: 'Help article not found',
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Gleb Gr',
		message: 'Page not found',
	})
})

app.listen(3000, () => {
	console.log(`Server is up on ${port} port`)
})
