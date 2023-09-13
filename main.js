const searchForm = document.querySelector('.search')
const input = document.querySelector('#search-input')
const temperature = document.querySelector('#main-temperature')
const nowCity = document.querySelector('#city')
const weatherImg = document.querySelector('.weather-img')
const feelsLike = document.querySelector('#feels')
const sunriseInfo = document.querySelector('#sunrise')
const sunsetInfo = document.querySelector('#sunset')
const time = document.querySelectorAll('.time')

for (let i = 0; i < time.length; i++) {
	console.log(time[i])
}

async function getCity(cityName) {
	const serverUrl = 'http://api.openweathermap.org/data/2.5/weather'
	const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
	const url = await `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`
	const response = await fetch(url)
	const data = await response.json()
	return data
}

async function getForecast(cityName) {
	try {
		const forecast = 'https://api.openweathermap.org/data/2.5/forecast'
		const apiKey = '1fc1c3c4f7ab985357be46392f09aafe'
		const url = `${forecast}?q=${cityName}&appid=${apiKey}&units=metric`
		const forecastResponse = await fetch(url)
		const forecastData = await forecastResponse.json()
		return forecastData
	} catch {
		throw new Error('404: Not Found!')
	}
}

searchForm.addEventListener('submit', event => {
	event.preventDefault()

	getCity(input.value).then(response => {
		splitFunction(
			response.name,
			response.main.temp,
			response.weather[0].icon,
			response.main.feels_like,
			response.sys.sunrise,
			response.sys.sunset
		)
		console.log(response)
	})
	getForecast(input.value)
		.then(response => {
			console.log(response)
		})
		.catch(error => {
			console.log(error)
		})
})

function splitFunction(city, temp, icon, feels, sunriseObj, sunsetObj) {
	nowCity.textContent = city
	temperature.textContent = Math.round(temp) + '°'
	weatherImg.src = `https://openweathermap.org/img/wn/${icon}@4x.png`
	feelsLike.textContent = Math.round(feels)
	const sunrise = new Date(sunriseObj * 1000)
	const sunset = new Date(sunsetObj)
	sunriseInfo.textContent = `${sunrise.getHours()}:${sunrise.getMinutes()}`
	sunsetInfo.textContent = `${sunset.getHours()}:${sunset.getMinutes()}`
}
