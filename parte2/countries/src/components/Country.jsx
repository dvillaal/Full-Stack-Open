import axios from 'axios'
import { useEffect } from 'react'
const api_key = import.meta.env.VITE_SOME_KEY
const url = "https://api.openweathermap.org/data/2.5/weather"

const Country = ({country, weather, setWeather}) => {

    useEffect(() => {
        if (country !== undefined){
            axios.get(url, 
                {
                    params: {
                        q: `${country.capital}`,
                        appid: api_key,
                        units: "metric",
                        lang: "es"
                    }
                }
            ).then(response => setWeather(response.data))
        }

    }, [country, setWeather])
    if (weather !== undefined){
        console.log(weather)
        const imageWeather = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

        return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>languages:</h2>
            <ul>
                {Object.values(country.languages).map((language, i) => ( 
                    <li key={i}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png}/>
            <br/>
            <h2>Weather in {country.capital}</h2>
            <p>temperature {weather.main.temp} Celsius</p>
            <img src={imageWeather}/>
            <p>{weather.weather[0].description} {weather.wind.speed}</p>
        </div>
        )
    }
}


export default Country