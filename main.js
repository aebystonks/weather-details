const searchForm = document.querySelector('.search')
const input = document.querySelector('#search-input')
const temperature = document.querySelector('#main-temperature')
const nowCity = document.querySelector('#city')
const weatherImg = document.querySelector('.weather-img')
const feelsLike = document.querySelector('#feels')
const sunriseInfo = document.querySelector('#sunrise')
const sunsetInfo = document.querySelector('#sunset')

function getCity(cityName) {
	const serverUrl = 'http://api.openweathermap.org/data/2.5/weather'
	const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
	const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`
	return fetch(url).then(reponse => reponse.json())
}

searchForm.addEventListener('submit', event => {
	event.preventDefault()

	getCity(input.value).then(response => {
		splitFunction(
			response.name,
			response.main.temp,
			response.weather[0].icon,
			response.main.feels_like,
			response.sys.sunrise, //вот эта хуета, это из инфы response etc. Оттуда получил чет такое 1694468681
			response.sys.sunset
		)
		console.log(response)
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
