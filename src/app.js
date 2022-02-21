const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Deine paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static handlebars
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jhasmel Cabrera'
    })

})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jhasmel Cabrera'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jhasmel Cabrera'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send ({
            error: 'You must provide an address query'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {
        if (error) {
            return res.send ({ error })
        }
        forecast(latitude, longitude, (error, forescatData) => {
            if (error) {
                return res.send({ error })

            }
            res.send({
                forecast: forescatData,
                location,
                address: req.query.address
            })
        })
    })
})
    
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        errorMessage: 'Help article not found',
        name: 'Jhasmel Cabrera'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        errorMessage: 'Page not found',
        name: 'Jhasmel Cabrera'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000')
})