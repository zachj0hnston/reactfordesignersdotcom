import React, { Component } from 'react';

class CardCarousel extends Component {
  render() {
    return (
      <div className="card-carousel">
        <div className="card-carousel__inner">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default CardCarousel;
