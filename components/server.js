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
const rfs = require('rotating-file-stream')
const morgan = require('morgan')
const errorhandler = require('errorhandler')
const RedisStore = require('connect-redis')(session)
const redis = require('redis')

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

app.use(cookieParser(process.env.COOKIE))

const client = redis.createClient()
const hbs = exphbs.create({ defaultLayout: 'main' })

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSIONKEY,
  store: new RedisStore({ host: process.env.RHOST, port: process.env.RPORT, 
    client: client, tll: process.env.RTTL}),
  resave: false,
  saveUninitialized: false
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

const accessLogStream = rfs(`${__dirname}/log/morgan.log`, {
    interval: '1d', // rotate daily
    compress: 'gzip',
    size: '10M',
})

if (process.env.NODE_ENV === 'development' || null) {
    console.warn('In development mode!')
    app.use(errorhandler({ dumpExceptions: true, showStack: true }))
    app.use(morgan('dev'))
    process.on('warning', e => console.warn(e.stack))
}

if (process.env.NODE_ENV === 'production') {
    console.warn('In production mode!')
    app.use(morgan('combined', 
    { 
        skip(req, res) { return res.statusCode < 400; }, stream: accessLogStream 
    }))
}

app.use(favicon(path.join(__dirname, '../public/favicon.png')))

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))
