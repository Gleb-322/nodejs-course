const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

if (process.argv.length === 2) {
	console.log('Enter the postal code/city name/region name!')
} else {
	geocode(
		process.argv.slice(2).join(' '),
		(error, { latitude, longitude } = {}) => {
			if (error) {
				console.log(error)
			} else {
				forecast(latitude, longitude, (error, data = {}) => {
					if (error) {
						console.log(error)
					} else {
						console.log(data)
					}
				})
			}
		}
	)
}
