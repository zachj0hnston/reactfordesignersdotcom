import React, { Component } from 'react';
import _ from 'lodash';
import { SectionWrapper, RangeBadge } from './style'


export default class LinkedSection extends Component {

  handleSectionClick = () => {
    if (this.stringToArray(this.props.lines)) {
      this.props.onClick(this.stringToArray(this.props.lines));
    }
  }

  scrollToSelf = () => {

    const SECTION = this.sectionRef;
    const CONTAINER = this.sectionRef.parentNode.parentNode;
    const OFFSET_FROM_WINDOW = SECTION.getBoundingClientRect().top;
    const OFFSET_FROM_CONTAINER = SECTION.offsetTop;
    const IDEAL_TOP_PADDING = 100;
    const IDEAL_SCROLL = OFFSET_FROM_CONTAINER - IDEAL_TOP_PADDING;
    
    if (OFFSET_FROM_WINDOW < 50 || OFFSET_FROM_WINDOW > 300) {
      CONTAINER.scroll({
        top: IDEAL_SCROLL,
        behavior: 'smooth'
      });
    }
  }

  stringToArray = (stringArray) => {
    if (stringArray) {
      const SPLIT = stringArray.split("-");
      let start = SPLIT[0];
      let end = SPLIT[1];

      if (end) {
        end++
      } else {
        end = Number(start) + 1;
      }
      
      return _.range(start, end);
          
    } else {
      return false;
    }
  }

  isActive = () => {
    if (this.props.lines) {

      const ACTIVE_LINES = this.props.activeLines;
      const LINES = this.stringToArray(this.props.lines);
  
      // If the first number in each matches, consider it active
      if (ACTIVE_LINES[0] === LINES[0]) {
        this.scrollToSelf();
        return true;
      } else {
        return false;
      }
    }
  }

  render() {

    const {title, children} = this.props;

    const LINES = this.stringToArray(this.props.lines);

    let titleJSX;
    if (title) {
      titleJSX = <h2>{title}</h2>;
    }

    let rangeBadgeJSX;
    if (LINES) {
      const RANGE_STRING = LINES[1] ? LINES[0] + "-" + LINES[LINES.length - 1] : LINES[0];
      rangeBadgeJSX = <RangeBadge>{RANGE_STRING}</RangeBadge>;
    }
    
    return (
      <SectionWrapper 
        style={LINKED_SECTION_STYLE(this.isActive())}
        onClick={this.handleSectionClick}
        innerRef={(element) => this.sectionRef = element}
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
