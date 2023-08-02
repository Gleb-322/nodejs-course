const request = require('request')

const geocode = (address, callback) => {
	const url = `https://us1.locationiq.com/v1/search?key=pk.37ddb04e07aae01860808d10a5393965&q=${address}&format=json`

	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback('Unable to connect to geo service! Try again!', undefined)
		} else if (body.error) {
			callback(
				'Unable to find lat/long, you didnt specify postal code/city name/region name! Try again!',
				undefined
			)
		} else if (body.length === 0) {
			callback(
				'Unable to find lat/long of this postal code/city name/region name! Try again!',
				undefined
			)
		} else {
			callback(undefined, {
				latitude: body[0].lat,
				longitude: body[0].lon,
				locationByAdress: body[0].display_name,
			})
		}
	})
}

module.exports = geocode
