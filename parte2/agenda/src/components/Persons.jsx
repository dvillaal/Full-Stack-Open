const Persons = ({person, deletePerson}) => {

  const handleClick = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(person)
    }
  }
  return(
    <li>
      {person.name} {person.number}
      <button onClick={handleClick}>delete</button>
    </li>
  )
}

export default Persons