import React, { Component } from 'react';
import _ from 'lodash';
import { SectionWrapper, RangeBadge } from './style'


class LinkedSection extends Component {

  handleSectionClick = () => {
    this.props.onClick(this.props.lines);
  }

  isActive = () => {
    
    if (!this.props.activeLines.includes(0)) {
        let hasIntersection = this.props.lines.filter(x => this.props.activeLines.includes(x));
    
        if (hasIntersection.length >= 1) {
          return true
        } else {
          return false
        }
    } else {
        return false;
    }
  }

  render() {

    const RANGE = this.props.lines;
    const RANGE_STRING = RANGE[0] + "-" + RANGE[RANGE.length - 1];

    return (
      <SectionWrapper 
        style={LINKED_SECTION_STYLE(this.isActive())}
        onClick={this.handleSectionClick}
      >
        <RangeBadge>{RANGE_STRING}</RangeBadge>
        <h2>{this.props.title}</h2>
        {this.props.children}
      </SectionWrapper>
    );
  }
}

function LINKED_SECTION_STYLE(isActive) {
  return {
    background: isActive ? "rgba(0,0,0,0.08)" : "transparent",
  };
}

export default LinkedSection;
