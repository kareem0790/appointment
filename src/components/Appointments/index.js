// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    inputDate: '',
    starClick: false,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({inputDate: event.target.value})
  }

  onChangeFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachList => {
        if (eachList.id === id) {
          return {...eachList, isStarred: !eachList.isStarred}
        }
        return eachList
      }),
    }))
  }

  onStarChange = () => {
    this.setState(prevState => ({starClick: !prevState.starClick}))
  }

  onSubmitAppointment = event => {
    event.preventDefault()
    const {titleInput, inputDate} = this.state

    const newAppointment = {
      id: v4(),
      name: titleInput,
      date: inputDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      inputDate: '',
    }))
  }

  getList = () => {
    const {appointmentList, starClick} = this.state

    if (starClick === true) {
      return appointmentList.filter(each => each.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {titleInput, inputDate, starClick} = this.state

    const filteredList = this.getList()

    const activeButton = starClick ? 'active-btn' : ''
    return (
      <div className="appointment-bg-container">
        <div className="card-container">
          <div className="input-container">
            <form onSubmit={this.onSubmitAppointment}>
              <h1 className="appointment-heading">Add Appointment</h1>
              <div className="title-input-container">
                <label className="title" htmlFor="Title">
                  TITLE
                </label>
                <br />
                <input
                  value={titleInput}
                  type="text"
                  placeholder="Title"
                  className="title-input"
                  id="Title"
                  onChange={this.onChangeTitleInput}
                />
              </div>
              <div className="title-input-container">
                <label className="title" htmlFor="Date">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  value={inputDate}
                  onChange={this.onChangeDate}
                  className="date-input"
                  id="Date"
                />
              </div>
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr />
          <div className="starred-container">
            <h1 className="appointment-paragraph">Appointments</h1>
            <button
              type="button"
              onClick={this.onStarChange}
              className={`starred-button ${activeButton}`}
              data-testid="star"
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {filteredList.map(each => (
              <AppointmentItem
                appointmentDetails={each}
                key={each.id}
                onChangeFavorite={this.onChangeFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
