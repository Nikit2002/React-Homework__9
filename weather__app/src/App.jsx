import { useState, useEffect } from 'react'


function App() {
  const [city, setCity] = useState({});
  const [titleCity, setTitleCity] = useState('');

  const key = 'b02ec5e203604481a1debae4ace79233';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${titleCity}&units=metric&appid=${key}`

  const onSearchWeather = (e) => {
    if (e.key === 'Enter') {
      fetch(url)
        .then(res => res.json())
        .then(data => setCity(data))
    }
  }

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=kyiv&units=metric&appid=${key}`)
        .then(res => res.json())
        .then(data => setCity(data))
  }, [])

  return (
    <>
    <section className='weather__app'>
      <h2 className='weather__title'>Weather App by Nikita Dubinin</h2>
    <div className="weather__input__block">
      <input type="search" value={titleCity} onChange={(e) => setTitleCity(e.target.value)} onKeyDown={onSearchWeather} placeholder="Type town name to see it`s weather" className="weather__input__field" />
    </div>
      {city.main ? 
      <section className='weather__info'>
        <div className="weather__city">
          <h2>{city.name}</h2>
        </div>
        <div className="weather__temperature">
          <h1>{Math.trunc(city.main.temp)}°C</h1>
        </div>
        <div className="weather__feels">
          <p>Відчувається як <span>{Math.trunc(city.main.feels_like)}°C</span></p>
        </div>
        <div className="weather__additionals">
          <div className="weather__additional">
            <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="weather__icon" />
            <span className='weather__description'>{city.weather[0].description}</span>
          </div>
          <div className="weather__additional">
            <span>{Math.trunc(city.main.temp_min)}</span>
            <p>Мін. температура</p>
          </div>
          <div className="weather__additional">
            <span>{Math.trunc(city.main.temp_max)}</span>
            <p>Мaкс. температура</p>
          </div>
          <div className="weather__additional">
            <span>{Math.trunc(city.main.pressure)}</span>
            <p>Атмосферний тиск</p>
          </div>
          <div className="weather__additional">
            <span>{Math.trunc(city.wind.speed)} М/С</span>
            <p>Швидкість вітру</p>
          </div>
          <div className="weather__additional">
            <span>{Math.trunc(city.clouds.all)}</span>
            <p>Хмарність</p>
          </div>
        </div>
      </section> : null}
    </section>
    </>
  )
}

export default App
