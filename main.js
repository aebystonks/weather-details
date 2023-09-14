const searchForm = document.querySelector('.search')
const input = document.querySelector('#search-input')
const temperature = document.querySelector('#main-temperature')
const nowCity = document.querySelector('#city')
const weatherImg = document.querySelector('.weather-img')
const feelsLike = document.querySelector('#feels')
const sunriseInfo = document.querySelector('#sunrise')
const sunsetInfo = document.querySelector('#sunset')
const container = document.querySelectorAll('.hourly-item')
const favouriteButton = document.querySelector('.favourite')

const time = document.querySelectorAll('.time')
const forecastTemp = document.querySelectorAll('.temperature')
const forecastFeelsLike = document.querySelectorAll('.feels-like')
const hourlyIcon = document.querySelectorAll('.hourly-weather-img')

let citiesList = []

async function getCity(cityName) {
	const serverUrl = 'http://api.openweathermap.org/data/2.5/weather'
	const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
	const url = await `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`
	const response = await fetch(url)
	const data = await response.json()
	return data
}

async function fetchWeatherData(cityName) {
	const forecast = 'https://api.openweathermap.org/data/2.5/forecast'
	const apiKey = '1fc1c3c4f7ab985357be46392f09aafe'
	const url = `${forecast}?q=${cityName}&appid=${apiKey}&units=metric`
	try {
		const forecastResponse = await fetch(url)
		return await forecastResponse.json()
	} catch (error) {
		console.error('Error fetching data:', error)
		throw error
	}
}

function formatTime(date) {
	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')
	return `${hours}:${minutes}`
}

function updateForecastUI(container, forecastData) {
	for (let i = 0; i < container.length; i++) {
		const realTime = new Date(forecastData.list[i].dt * 1000)
		const hoursMinutes = formatTime(realTime)
		time[i].textContent = hoursMinutes

		forecastTemp[i].textContent =
			'Temperature: ' + Math.round(forecastData.list[i].main.temp) + '°'
		forecastFeelsLike[i].textContent =
			'Feels like: ' + Math.round(forecastData.list[i].main.feels_like) + '°'

		hourlyIcon[
			i
		].src = `https://openweathermap.org/img/wn/${forecastData.list[i].weather[0].icon}@4x.png`
	}
}

async function getAndDisplayForecast(cityName) {
	try {
		const forecastData = await fetchWeatherData(cityName)
		updateForecastUI(container, forecastData)
	} catch (error) {
		console.error('Error:', error)
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
	getAndDisplayForecast(input.value)
	input.value = ''
})

favouriteButton.addEventListener('click', () => {
	citiesList.push(nowCity.textContent)
	console.log(citiesList)
})

function addCity() {}

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
