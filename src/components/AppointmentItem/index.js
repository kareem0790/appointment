// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onChangeFavorite} = props
  const {name, date, id, isStarred} = appointmentDetails

  const onChangeStar = () => [onChangeFavorite(id)]

  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const dateFormat = format(new Date(date), 'dd MMMM yyyy, EEEE')

  return (
    <li className="appointment">
      <div className="appointment-container">
        <p className="title-appointment">{name}</p>
        <button
          type="button"
          data-testid="star"
          onClick={onChangeStar}
          className="star-button"
        >
          <img src={imgUrl} alt="star" className="star" />
        </button>
      </div>

      <p className="date-appointment">Date: {dateFormat}</p>
    </li>
  )
}

export default AppointmentItem
