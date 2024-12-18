import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'

function App() {
  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState('')
  const [country, setCountry] = useState(undefined)
  const [weather, setWeather] = useState(undefined)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
    }, [])
  
  console.log(countries[0])

  let countriesToShow = newCountry === ''
    ? countries
    : countries.filter((country) =>
        country.name.common.toLowerCase().includes(newCountry.toLowerCase())
      );

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setCountry(countriesToShow[0])
    }
  }, [countriesToShow])

  const showCountry = (country) => {
    setCountry(country)
  }

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
    setCountry(undefined)
    setWeather(undefined)
  }

  return (
    <div>

      <Filter newCountry={newCountry} handleCountryChange={handleCountryChange}/>
      
      <Countries countriesToShow={countriesToShow} showCountry={showCountry} country={country}/>

      <Country country={country} weather={weather} setWeather={setWeather}/>
      
    </div>
  )
}

export default App
