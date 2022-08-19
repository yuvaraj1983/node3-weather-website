const request = require('request')

const forecast = (latitide, longitude, callback) => {

    //const url='http://api.weatherstack.com/current?access_key=1fc8b17da38152678c5cfa36e1c2b322&query=37.8267,-122.4233&units=f'

    const url='http://api.weatherstack.com/current?access_key=1fc8b17da38152678c5cfa36e1c2b322&query=' + latitide + ',' + longitude +'&units=f'

    request({ url: url, json:true }, (error, response) => {
        if(error){
            callback('Unable to connect to location services!',undefined)
        } else if (response.body.error){
            callback('Unable to find location. Try another search.',undefined)
        } else { 
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out')
        }
    })

}

module.exports = forecast;