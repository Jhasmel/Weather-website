const request = require ('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f92de25c491b0e82689253eef73ba2e5&query=' + latitude + ',' + longitude

    request ({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)

        } else {
            callback(undefined, body.current.weather_descriptions + '. It is ' + body.current.temperature + " degrees with a termic sensation of  " +  body.current.feelslike +  " C. There is a humidity of" + body.current.humidity + " % and an UV index of " + body.current.uv_index)
    
        }
    })
}


module.exports = forecast 