const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
}

const Header = ({name}) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => <Parts key={part.id} name={part.name} excercise={part.exercises}/>)}
      </div>
    )
  }
  
  const Parts = ({name, excercise}) => {
    return (
      <p>
        {name} {excercise}
      </p>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((sum, num) => {
      return sum + num.exercises
    }, 0)
    return (
      <strong>total of {total} excersices</strong>
    )
  }

export default Course