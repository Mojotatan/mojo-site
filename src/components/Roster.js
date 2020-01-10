import React from 'react'
import axios from 'axios'
import Accordion from './Accordion'

class Roster extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roster: {
        title: '',
        rules: [],
        units: []
      }
    }
  }
  componentDidMount() {
    axios.get('/api/40k/roster/1500_ba_v5')
    .then(res => {
      let elem = document.createElement('div')
      elem.innerHTML = res.data
      this.setState({
        roster: processRoster(elem)
      })
    })
    .catch(err => console.error(err))
  }
  render() {
    console.log(this.state.roster)
    return (
      <div className='container roster'>
        <div className='rules'>
          {this.state.roster.rules.map((rule, index) => (
            <Accordion
              key={index}
              head={rule.name}
              body={rule.text}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Roster

function processRoster(html) {
  let roster = {
    title: html.querySelector('h1').innerText,
    rules: [],
    units: []
  }
  html.querySelectorAll('.force').forEach(detachment => {
    detachment.querySelectorAll('.rootselection').forEach((unit, index) => {
      if (index === 0) {
        // first one is force org slot
        // roster.rules.push(strip(unit.innerHTML))
      } else {
        roster.units.push(unit)
      }
    })
  })
  html.querySelectorAll('.summary > p').forEach(rule => {
    let lines = strip(rule.innerHTML).split('\n')
    roster.rules.push({
      name: lines[1].trim().replace(/:/, ''),
      text: lines.slice(2, -2).join('\n')
    })
  })
  return roster
}

function strip(html) {
  // let str = html.replace(/( )\1{1,}/, '')
  // get rid of newline characters?
  let content = ''
  let bracket = false
  for (let i = 0; i < html.length; i++) {
    if (html[i] === '<') bracket = true
    if (!bracket) content += html[i]
    if (html[i] === '>') bracket = false
  }
  return content
}