const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const app = express()
const PORT = process.env.PORT || 3000

var hbs = exphbs.create({ defaultLayout: 'main' })
// View Engine
app.engine('handlebars', hbs.engine)
app.set("view engine", "handlebars")

app.get('/', (req, res, next) => {
    res.render("index", {
        showTitle: true,

        helpers: {
            foo: function() { return 'Foo' }
        }
    })
})





app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))