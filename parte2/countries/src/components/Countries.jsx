const Countries = ({ countriesToShow, showCountry, country }) => {
    if (countriesToShow.length > 10){
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (country !== undefined){
        return (null)
    } else {
        return (
            countriesToShow.map((country, i) => <p key={i}>{country.name.common} <button onClick={() => showCountry(country)}>show</button></p> )
        )
    }
}

export default Countries