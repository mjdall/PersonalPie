import React, { useState } from 'react'
import { Row, Col } from 'reactstrap'
import { ForecastToColour, GetDateWithOffset } from '../../js/helpers'

const API_EP = '/weather/'
const TUROA = 'turoa'
const WHAKAPAPA = 'whakapapa'

const DEFAULT_STYLE = {
  backgroundColor: '#474747',
  height: '20vh',
  textAlign: 'center',
}

const defaultPromiseCatch = () => undefined

const renderForecastCell = (skifield, day, weather) => {
  // shallow copy is fine for this case
  const cellStyle = Object.assign({}, DEFAULT_STYLE)

  if (weather !== undefined) {
    cellStyle.backgroundColor = ForecastToColour(weather)
  }

  return (
    <Row
      style={cellStyle}
      md={{ size: 2 }}
      key={`forecast-cell-${skifield}-${day}`}
    >
      {typeof day === 'string' && <h4 style={{ color: '#FFF' }}>{day}</h4>}
    </Row>
  )
}

const renderForecastCol = (skifield, skifieldForecasts, dayText) => {
  let cells = []
  for (let i = 0; i < 5; i++) {
    let day, weather

    // if we have a forecast for this day
    if (Array.isArray(skifieldForecasts) && skifieldForecasts.length - 1 >= i) {
      const forecast = skifieldForecasts[i]
      day = dayText ? forecast.day : i
      weather = forecast.weather
    } else {
      day = dayText ? GetDateWithOffset(i) : i
    }

    cells.push(renderForecastCell(skifield, day, weather))
  }

  return (
    <>
      <Col md={{ size: 6 }}>{cells.map(cell => cell)}</Col>
    </>
  )
}

const SnowReport = () => {
  let [turoaReports, setTuroaReports] = useState(5)
  let [whakapapaReports, setWhakapapaReports] = useState(undefined)

  // could make this a bit better but that's alright
  // need to improve catch
  if ([turoaReports, whakapapaReports].includes(5)) {
    // setTuroaReports()
    // setWhakapapaReports()
    fetch(API_EP + TUROA)
      .then(resp => resp.json())
      .then(setTuroaReports)
      .catch(defaultPromiseCatch)

    fetch(API_EP + WHAKAPAPA)
      .then(resp => resp.json())
      .then(setWhakapapaReports)
      .catch(defaultPromiseCatch)
  }

  return (
    <Row>
      {renderForecastCol(TUROA, turoaReports, true)}
      {renderForecastCol(WHAKAPAPA, whakapapaReports, false)}
    </Row>
  )
}

export default SnowReport
