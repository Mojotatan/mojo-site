import React from 'react'

import Usa from './MapUsa'
import Earth from './MapEarth'

class Travels extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      map: 'usa',
      highlight: ' ',
      focus: ''
    }
    this.onHover = this.onHover.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.switchMap = this.switchMap.bind(this)
  }
  onHover(e) {
    this.setState({highlight: e.target.getAttribute('data-name')})
  }
  onFocus(e) {
    this.setState({focus: e.target.getAttribute('data-name')})
  }
  switchMap(e) {
    this.setState({map: e.target.id, focus: ''})
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
          {this.state.focus ?
            <div className='travelogue'>
              <div className='map-focus text-white'>{this.state.focus}</div>
              <img src='/assets/img/morgue-thrull.jpg' />
              <div>
                Morgue Thrull hypers in the chat, we are back on board.<br /><br /><br /><br /><br /><br />Anyway had to use up space.
              </div>
            </div>
            : null
          }
          <div className='map-highlight text-white'>{this.state.highlight}</div>
          {this.state.map === 'usa' ?
            <Usa onHover={this.onHover} onFocus={this.onFocus} />
            :
            <Earth onHover={this.onHover} onFocus={this.onFocus} />
          }
        </div>
      </div>
    )
  }
}

export default Travels