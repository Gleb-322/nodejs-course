console.log('client side js is loaded')

const form = document.querySelector('form')
const input = document.querySelector('input')
const forecast = document.querySelector('.forecast')

form.addEventListener('submit', e => {
	e.preventDefault()

	forecast.innerHTML = `loading...`

	fetch(`http://localhost:3000/weather?address=${input.value}`)
		.then(res => res.json())
		.then(data =>
			data.error
				? (forecast.innerHTML = `<p class='error'>Something is going wrong: ${data.error}</p>`)
				: (forecast.innerHTML = `
					<p>Location: ${data.locationByLatLong}.</p>
					<p>Temperature: ${data.temperature} degrees Celsius, feels like ${data.feelslike}.</p>
					<p>Precip: ${data.precip}%.</p>
				`)
		)
		.catch(e => console.log(e))
})
