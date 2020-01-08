import React from 'react'
import axios from 'axios'

class Roster extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roster: null
    }
  }
  componentDidMount() {
    axios.get('/roster/1500_ba_v5')
    .then(res => {
      let roster = document.createElement('div')
      roster.innerHTML = res.data
      console.log(roster)
      this.setState({roster})
    })
    .catch(err => console.error(err))
  }
  render() {
    return (
      <div className="roster">stinky poopy</div>
    )
  }
}

export default Roster