import { useSelector } from 'react-redux'

const Notification = ({ classNotification }) => {
  const notification = useSelector(({ notification }) => {
    return notification
  })

  if (notification === '') {
    return null
  }

  return (
    <div className={classNotification}>
      {notification}
    </div>
  )
}

export default Notification