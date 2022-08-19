const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1fc8b17da38152678c5cfa36e1c2b322&query=' + address
    request({url: url, json: true},(error, response) => {
        if(error){
            callback('Unable to connect to location service!',undefined)
        } else if(response.body.error) {
            callback('Unable to find location!',undefined)
        }
        else {
            const latitude =  response.body.location.lat
            const longitude =    response.body.location.lon
            const location = response.body.location.name
            callback(undefined,{
                latitude: response.body.location.lat,
                longitude: response.body.location.lon,
                location: response.body.location.name
            })
        }
    })
}

module.exports = geocode