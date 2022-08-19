const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

//Define paths for Express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPaths = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPaths)
//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Andrew Mead'

    })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Andrew Mead'
    })
    
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'This is  some helpful text',
        title: 'Help',
        name: 'Andrew Mead '  
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew'
//     },{
//         name: 'sarah'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About<h1>')
// })

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        res.send({
            error: 'You must provide an address'
        })
    }
    //'37.8267,-122.4233'
   
    geocode(req.query.address, (error,  { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }
            console.log(forecastdata)
            console.log(location)

            res.send({
               forecast:  forecastdata,
               location,
               address: req.query.address 
            })
        })
    })

     
})

app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)

    res.send({
        products : []
    })
})

app.get('/help/*',(req, res) => {
   res.render('404',{
    title: '404',
    name: 'Andrew',
    errorMessage: 'Help article not found'
   })
})

app.get('*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Andrew',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

//app.com
//app.com/help
//app.com/about