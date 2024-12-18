const Filter = ({newCountry, handleCountryChange}) => {
    return (
        <div>find country <input value={newCountry} onChange={handleCountryChange}/> </div>
    )
}

export default Filter