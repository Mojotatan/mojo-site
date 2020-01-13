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
    // axios.get('/api/40k/roster/3000_um')
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
        <div className='row rules'>
          {this.state.roster.rules.sort(alphabetize).map((rule, index) => (
            <div key={index} className='col-lg-6 col-12'>
              <Accordion
                head={rule.name}
                body={rule.text}
            />
            </div>
          ))}
        </div>
        <div className='row units'>
          {this.state.roster.units.sort(alphabetize).map((unit, index) => (
            <div key={index} className='col-lg-6 col-12 unit'>
              <div className='unit-name'>
                {unit.name}{(unit.quantity > 1) ? ` (x${unit.quantity})`: ''}
              </div>
              <div className='unit-properties'>
                <div>
                  <strong>Categories: </strong>
                  <span>{unit.properties.categories}</span>
                </div>
                {unit.properties.selections ?
                  <div>
                    <strong>Selections: </strong>
                    <span>{unit.properties.selections}</span>
                  </div>
                  : null
                }
                <div>
                  <strong>Rules: </strong>
                  <span>{unit.properties.rules}</span>
                </div>
                {unit.properties.profiles.map((profile, index) => (
                  <div key={index} className='unit-profiles'>
                    {profile.map((span, spandex) => (
                      <span className={spandex % 2 === 0 ? 'bold' : ''}>{span}</span>
                    ))}
                  </div>
                ))}
              </div>
              {unit.tables.map((table, index) => (
                <table key={index} className='roster-table'>
                  <tbody>
                    {table.map((tr, index) => (
                      <tr key={index}>
                        {tr.map((td, index) => (
                          <td key={index}>{td}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </div>
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
    detachment.querySelectorAll('.category').forEach((category, index) => {
      if (index === 0) {
        // first category is force org slot
      } else {
        category.querySelectorAll('.rootselection').forEach(unit => {
          let existing = false
          for (let i = 0; i < roster.units.length; i++) {
            if (roster.units[i].raw === unit.innerHTML) {
              roster.units[i].quantity++
              existing = true
              i = roster.units.length
            }
          }
          if (!existing) {
            roster.units.push({
              name: unit.querySelector('h4').innerText,
              quantity: 1,
              raw: unit.innerHTML,
              properties: {
                categories: unit.querySelector('.category-names span:nth-child(2)').innerText,
                selections: unit.querySelector('h4 + p:not(.category-names') ? unit.querySelector('h4 + p:not(.category-names)').innerText : null,
                rules: unit.querySelector('.rule-names span:nth-child(2)').innerText,
                profiles: Array.from(unit.querySelectorAll('.profile-names')).map(profile => {
                  return Array.from(profile.querySelectorAll('span')).map(span => span.innerText)
                })
              },
              tables: Array.from(unit.querySelectorAll('table')).map(table => {
                return Array.from(table.querySelectorAll('tr')).map(tr => {
                  return Array.from(tr.querySelectorAll('th:not(:last-child), td:not(:last-child')).map(td => {
                    return td.innerText
                  })
                })
              })
            })
          }
        })
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

function alphabetize(a, b) {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
  else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
  else return 0
}