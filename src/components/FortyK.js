import React from 'react'
import axios from 'axios'
import Roster from './Roster'
import processRoster from '../utils/processRoster'

class FortyK extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rosters: [{name: 'Select a roster'}],
      select: 0
    }
    this.select = this.select.bind(this)
  }
  select(e) {
    this.setState({
      select: Number(e.target.value)
    })
  }
  componentDidMount() {
    axios.get('/api/40k/roster-list')
    .then(res => {
      this.setState({
        rosters: [{name: 'Select a roster'}, ...res.data.map(roster => processRoster(roster))]
      })
    })
    .catch(err => console.error(err))
  }
  render() {
    console.log(this.state)
    return (
      <div className='container 40k'>
        <div>
          <select className='roster-select' onChange={this.select} value={this.state.select}>
            {this.state.rosters.map((roster, index) => (
              <option key={index} value={index}>{roster.name}</option>
            ))}
          </select>
        </div>
        {this.state.select ?
          <Roster roster={this.state.rosters[this.state.select]} />
          : null
        }
      </div>
    )
  }
}

export default FortyK