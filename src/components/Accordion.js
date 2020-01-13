import React from 'react'

class Accordion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    this.setState({
      open: !this.state.open
    })
  }
  render() {
    return (
      <div className={this.props.className ? `accordion ${this.props.className}` : 'accordion'} onClick={this.toggle}>
        <span>{this.props.head}</span>
        {this.state.open ? <div>{this.props.body}</div> : null}
      </div>
    )
  }
}

export default Accordion