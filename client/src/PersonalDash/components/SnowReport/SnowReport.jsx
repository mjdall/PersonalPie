import React, { useState } from 'react'
import { Row, Col } from 'reactstrap'
import { ForecastToColour, GetDateWithOffset } from '../../js/helpers'

const API_EP = '/weather/'
const TUROA = 'turoa'
const WHAKAPAPA = 'whakapapa'

const DEFAULT_STYLE = {
  backgroundColor: '#474747',
  width: '100%',
  height: '100%',
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
    <Col md={{ size: 2 }} key={`forecast-cell-${skifield}-${day}`}>
      <p style={cellStyle}>{day}</p>
    </Col>
  )
}

const renderForecastRow = (skifield, skifieldForecasts) => {
  let cells = []
  for (let i = 0; i < 5; i++) {
    let day, weather

    // if we have a forecast for this day
    if (Array.isArray(skifieldForecasts) && skifieldForecasts.length - 1 >= i) {
      const forecast = skifieldForecasts[i]
      day = forecast.day
      weather = forecast.weather
    } else {
      day = GetDateWithOffset(i)
    }
    cells.push(renderForecastCell(skifield, day, weather))
  }

  return (
    <>
      <h3>{skifield}</h3>
      <Row>
        {cells.map(cell => cell)}
      </Row>
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
    <>
      {renderForecastRow(TUROA, turoaReports)}
      {renderForecastRow(WHAKAPAPA, whakapapaReports)}
    </>
  )
}

export default SnowReport
