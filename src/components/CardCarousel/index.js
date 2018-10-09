import React, { Component } from 'react';
import { Outer, Inner } from './style'

export default class CardCarousel extends Component {
  render() {
    return (
      <Outer>
        <Inner>
          { this.props.children }
        </Inner>
      </Outer>
    );
  }
}
