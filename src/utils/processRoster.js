// pass in this function to .sort
const alphabetize = (a, b) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
  else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
  else return 0
}

const strip = html => {
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

export default (file) => {
  let html = document.createElement('div')
  html.innerHTML = file.html
  let roster = {
    name: file.name,
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
              // subUnits: Array.from(unit.querySelectorAll('p + ul > li > h4')).map(name => name.innerText),
              properties: {
                categories: unit.querySelector('.category-names span:nth-child(2)').innerText,
                selections: unit.querySelector('h4 + p:not(.category-names') ? unit.querySelector('h4 + p:not(.category-names)').innerText : null,
                rules: unit.querySelector('.rule-names span:nth-child(2)').innerText,
                // profiles: Array.from(unit.querySelectorAll('.profile-names')).map(profile => {
                //   return Array.from(profile.querySelectorAll('span')).map(span => span.innerText)
                // })
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
  roster.rules.sort(alphabetize)
  roster.units.sort(alphabetize)
  return roster
}