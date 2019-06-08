const app = module.exports = require('express')()

app.get('/', (req, res, next) => {
    res.render('index', {
        showTitle: true,
        helpers: {
            foo: function() { return 'Foo' }
        }
    })
})

app.use('/login', require('./auth'))

app.all('*', (req, res) => {
    if ( res.statusCode < 400 ) {
        res.render('errors/status', {
            showTitle: true,
            helpers: {
                statusCode: () => { return '404' }
            }
        })
    }
})

app.use((err, req, res, next) => {
    if ( res.statusCode > 500 ) { 
        // stream to log file
        res.render('errors/status', {
            showTitle: true,
            helpers: {
                statusCode: () => { return res.statusCode }
            }
        })
    }
})