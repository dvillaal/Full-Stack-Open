const Notification = ({ message, classNotification }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={classNotification}>
      {message}
    </div>
  )
}

export default Notification