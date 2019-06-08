const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const app = express()
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const routes = require('./routes/index')
const cors = require('cors')
const helmet = require('helmet')

const PORT = process.env.PORT || 3000

app.use(helmet())

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
  }
}))
app.use(helmet.noCache())
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))

app.use(cookieParser())

const hbs = exphbs.create({ defaultLayout: 'main' })

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routes
app.use(routes)

// Allow incoming connection from default router address
app.set('trust proxy', 'loopback, linklocal, uniquelocal')

const allowedOrigins = ['localhost:8080']

app.use(cors({ origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) === -1) {
            const reply = 'CORS policy for this site does not' +
                'allow access from the specified origin.'
            return callback(new Error(reply), false)
        }
        return callback(null, true)
    } 
}))

app.use(favicon(path.join(__dirname, '../public/favicon.png')))

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))
