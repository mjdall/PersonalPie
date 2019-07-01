import React from 'react'

class SimpleClock extends React.Component {
  state = {
    time: new Date(),
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
  }

  tick() {
    this.setState({
      time: new Date(),
    })
  }

  render() {
    const time = this.state.time
    const timeString = time.toLocaleTimeString()
    // const dateString = time.toLocaleDateString()
    return (
      <>
        <h2 className="header-text">{timeString}</h2>
        {/* <h2 className="header-text">{dateString}</h2> */}
      </>
    )
  }
}

export default SimpleClock
