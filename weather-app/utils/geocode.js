const request = require('request')

const geocode = (address, callback) => {
	// const url = `http://api.positionstack.com/v1/forward?access_key=ad828781caec0b1722f30406446908f0&limit=1&query=${address}`
	const url = `https://us1.locationiq.com/v1/search?key=pk.37ddb04e07aae01860808d10a5393965&q=${address}&format=json`

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to geo service!', undefined)
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
			})
		}
	})
}

module.exports = geocode
