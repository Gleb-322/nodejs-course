const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=6efb8e2624105d43f11de96dfa9e9a5c&query=${latitude},${longitude}`

	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback('Unable to connect to weather service! Try again!', undefined)
		} else if (body.error) {
			callback('Unable to find location! Try again!', undefined)
		} else {
			callback(undefined, {
				temperature: body.current.temperature,
				locationByLatLong: body.location.name,
				feelslike: body.current.feelslike,
				precip: body.current.precip,
			})
		}
	})
}

module.exports = forecast
