const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const app = express()
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes/index')

const PORT = process.env.PORT || 3000

const hbs = exphbs.create({ defaultLayout: 'main' })

app.engine('handlebars', hbs.engine)
app.set("view engine", "handlebars")

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

// Routes
app.use(routes)

 // Allow incoming connection from default router address
app.set('trust proxy', 'loopback, linklocal, uniquelocal')

app.use(cookieParser())

app.use(favicon(path.join(__dirname, '../public/favicon.png')))

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))