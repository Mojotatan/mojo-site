import React from 'react'

import Usa from './MapUsa'
import Earth from './MapEarth'

class Travels extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      map: 'usa',
      highlight: null
    }
    this.hover = this.hover.bind(this)
    this.switchMap = this.switchMap.bind(this)
  }
  hover() {
    // triggers map 
  }
  switchMap(e) {
    this.setState({map: e.target.id})
  }
  render() {
    return (
      <div className='travels'>
        <div className='container'>
          <div>ALL AROUND THE WORLD</div>
          <div>
            <p>Places in <span className='text-black'>black</span> I'd love to visit.</p>
            <p>Places in <span className='text-yellow'>yellow</span> I have visited.</p>
            <p>Places in <span className='text-red'>red</span> I've visited and I'd love to tell you about it!</p>
          </div>
        </div>
        <div className='map-controls'>
          <div id='usa' className={this.state.map === 'usa' ? 'active' : ''} onClick={this.switchMap}>United States</div>
          <div id='earth' className={this.state.map === 'earth' ? 'active' : ''} onClick={this.switchMap}>Earth</div>
        </div>
        <div className='map-container'>
          {this.state.map === 'usa' ?
            <Usa />
            :
            <Earth />
          }
          {this.state.highlight ?
            <div className='travelogue'>
              <img src='' />
              <div></div>
            </div>
            : null
          }
        </div>
      </div>
    )
  }
}

export default Travels