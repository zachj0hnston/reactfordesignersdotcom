import React, { Component } from 'react';

class Hero extends Component {
  render() {
    return (
      <div className="text-block">
        {
          !this.props.section ? null : (
            <div className="text-block__section">
              {this.props.section}
            </div>
          )
        }
        { this.props.children }
      </div>
    );
  }
}

export default Hero;
