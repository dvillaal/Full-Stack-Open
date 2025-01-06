import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterName, setFilterName] = useState("")
  const [messageNotification, setMessageNotification] = useState("")
  const [classNotification, setClassNotification] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  let personsToShow = []

  if (filterName === ""){
    personsToShow = persons
  } else {
    personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase()))
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className={classNotification}>
        {message}
      </div>
    )
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const preventPerson = persons.find((person) => person.name === newName)

    if (preventPerson === undefined){
      
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setClassNotification('successful-notification')
          setMessageNotification(`Added ${newName}`)
          setTimeout(() => {
            setMessageNotification(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data.error)
          setClassNotification('error-notification')
          setMessageNotification(`${error.response.data.error}`)
          setTimeout(() => {
            setMessageNotification(null)
          }, 5000)
        })

    } else {
      if (preventPerson.number === newNumber){
        alert(`${newName} is already aded to phonebook`)
      } else {
        if (window.confirm(`${preventPerson.name} is already added to phonebook, replace the old number with a new one?`)){
          const changedPerson = {...preventPerson, number: newNumber}
          personService
            .update(preventPerson.id, changedPerson)
            .then(returnedPerson => setPersons(persons.map(person => person.id !== preventPerson.id ? person : returnedPerson)))
            .catch(() => {
              setClassNotification('error-notification')
              setMessageNotification(`Information of ${preventPerson.name} has already been removed from server`)
              setTimeout(() => {
                setMessageNotification(null)
              }, 5000)
            })
        }
      }
    }

  }

  const deletePerson = (person) => {
    console.log(person.id)
    console.log(persons)
    personService
      .eliminate(person.id)

    const updatePersons = persons.filter(p => {
      console.log(p.id.toString())
      return p.id.toString() !== person.id.toString()})
    
    console.log(updatePersons)
    setPersons(updatePersons)
    console.log(persons)
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={messageNotification} />

      <Filter filterName={filterName} handleFilterName={handleFilterName} />

      <h3>Add a new</h3>
      
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange}/>
      
      <h3>Numbers</h3>

      <ul>
        {personsToShow.map((person, i) => <Persons key={i} person={person} deletePerson={deletePerson}/>)}
      </ul>

    </div>
  )
}

export default App