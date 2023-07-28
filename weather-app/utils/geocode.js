const request = require('request')

// const geocode = (address, callback) => {
// 	const url = `http://api.positionstack.com/v1/forward?access_key=ad828781caec0b1722f30406446908f0&limit=1&query=${address}`

// 	request({ url, json: true }, (error, { body }) => {
// 		if (error) {
// 			callback('Unable to connect to geo service!', undefined)
// 		} else if (body.error) {
// 			callback(
// 				'Unable to find lat/long, you didnt specify postal code/city name/region name! Try again!',
// 				undefined
// 			)
// 		} else if (body.data.length === 0) {
// 			callback(
// 				'Unable to find lat/long of this postal code/city name/region name! Try again!',
// 				undefined
// 			)
// 		} else {
// 			callback(undefined, {
// 				latitude: body.data[0].latitude,
// 				longitude: body.data[0].longitude,
// 			})
// 		}
// 	})
// }

const geocode = (address, callback) => {
	setTimeout(() => {
		callback(undefined, {
			latitude: '44.1545',
			longitude: '-75.7088',
		})
	}, 2000)
}

module.exports = geocode
