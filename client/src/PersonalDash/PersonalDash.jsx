import React from 'react'
import { Container } from 'reactstrap'
import SnowReport from './components/SnowReport/SnowReport'

import Footer from './components/Footer'

require('./sass/style.scss')

const PersonalDash = () => (
  <Container>
    <SnowReport />
    <Footer />
  </Container>
)

export default PersonalDash
