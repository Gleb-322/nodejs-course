const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=6efb8e2624105d43f11de96dfa9e9a5c&query=${latitude},${longitude}`

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined)
		} else if (body.error) {
			callback('Unable to find location!', undefined)
		} else {
			callback(
				undefined,
				`Its currently ${body.current.temperature} degrees Celsius out in ${body.location.name}. Its feels like ${body.current.feelslike} degrees Celsius out. This is a ${body.current.precip}% chance of rain.`
			)
		}
	})
}

// const urlWeatherStack =
// 	'http://api.weatherstack.com/current?access_key=6efb8e2624105d43f11de96dfa9e9a5c&query=34.05513,-118.25703'

// request({ url: urlWeatherStack, json: true }, (error, response, body) => {
// 	if (error) {
// 		console.log('Unable to connect to weather service!')
// 	} else if (response.body.error) {
// 		console.log('Unable to find location!')
// 	} else {
// 		console.log(
// 			`Its currently ${response.body.current.temperature} degrees Celsius out in ${response.body.location.name}. Its feels like ${response.body.current.feelslike} degrees Celsius out. This is a ${response.body.current.precip}% chance of rain.`
// 		)
// 	}
// })

module.exports = forecast
