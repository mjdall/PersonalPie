import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import SnowReport from './components/SnowReport/SnowReport'

import SimpleClock from './components/SimpleClock'

require('./sass/style.scss')

const PersonalDash = () => (
  <Container fluid>
    <Row>
      <Col md={{ size: 4 }}>
        <SnowReport />
      </Col>

      <Col md={{ size: 8 }}>
        <Row className="center-contents upper-block">
          <SimpleClock />
        </Row>
        <Row className="center-contents lower-block">
          <h2 className="header-text">
            think of another little app to go here
          </h2>
        </Row>
      </Col>
    </Row>
  </Container>
)

export default PersonalDash
