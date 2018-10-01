import React, { Component } from 'react';
import _ from 'lodash';
import { SectionWrapper, RangeBadge } from './style'


class LinkedSection extends Component {

  handleSectionClick = () => {
    if (this.props.lines) {
      this.props.onClick(this.props.lines);
    }
  }

  isActive = () => {
    
    if (!this.props.activeLines.includes(0) && this.props.lines) {
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

    const {title, lines, children} = this.props;

    let titleJSX;
    if (title) {
      titleJSX = <h2>{title}</h2>;
    }

    let rangeBadgeJSX;
    if (lines) {
      const RANGE_STRING = lines[0] + "-" + lines[lines.length - 1];
      rangeBadgeJSX = <RangeBadge>{RANGE_STRING}</RangeBadge>;
    }
    
    return (
      <SectionWrapper 
        style={LINKED_SECTION_STYLE(this.isActive())}
        onClick={this.handleSectionClick}
      >
        {rangeBadgeJSX}
        {titleJSX}
        {children}
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
