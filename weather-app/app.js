const request = require('request')

const urlPositionStack =
	'http://api.positionstack.com/v1/forward?access_key=ad828781caec0b1722f30406446908f0&limit=1&query=Los Angeles'

request({ url: urlPositionStack, json: true }, (error, response, body) => {
	console.log(response.body.error)
	if (error) {
		console.log('Unable to connect to geo service!')
	} else if (response.body.error) {
		console.log(
			'Unable to find lat/long, you didnt specify postal code/city name/region name! Try again!'
		)
	} else if (response.body.data.length === 0) {
		console.log(
			'Unable to find lat/long of this postal code/city name/region name! Try again!'
		)
	} else {
		console.log(response.body.data[0].latitude)
		console.log(response.body.data[0].longitude)
	}
})

const urlWeatherStack =
	'http://api.weatherstack.com/current?access_key=6efb8e2624105d43f11de96dfa9e9a5c&query=34.05513,-118.25703'

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
