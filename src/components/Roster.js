import React from 'react'
import Accordion from './Accordion'

export default ({roster}) => (
  <div className='roster'>
    <h2>{roster.title}</h2>
    <div className='row rules'>
      {roster.rules.map((rule, index) => (
        <div key={index} className='col-lg-6 col-12'>
          <Accordion
            className={'bold'}
            head={rule.name}
            body={rule.text}
        />
        </div>
      ))}
    </div>
    <div className='row units'>
      {roster.units.map((unit, index) => (
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
            {/* couldn't figure out precise selector */}
            {/* {unit.subUnits.length > 0 ?
              <div>
                <strong>Units: </strong>
                <span>{unit.subUnits.join(', ')}</span>
              </div>
              : null
            } */}
            {/* don't think this info is actually important */}
            {/* {unit.properties.profiles.map((profile, index) => (
              <div key={index} className='unit-profiles'>
                {profile.map((span, spandex) => (
                  <span className={spandex % 2 === 0 ? 'bold' : ''}>{span}</span>
                ))}
              </div>
            ))} */}
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