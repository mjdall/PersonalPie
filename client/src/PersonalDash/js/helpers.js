module.exports = {
  ForecastToColour(forecast) {
    // todo: get proper colours
    const COLOURS = {
      Bluebird: '#FDE74C',
      Sunny: '#FDE74C',
      'Partly Cloudy': '#C1BFB5',
      Rain: '#8EB1C7',
    }
    // return valid forecast or solid red
    // solid red for debug atm
    return COLOURS[forecast] || '#FF0000'
  },
  GetDateWithOffset(offset) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    let date = new Date()
    date.setDate(date.getDate() + offset)
    return days[date.getDay()]
  },
}
