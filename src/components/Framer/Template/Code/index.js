import React, { Component } from 'react';
import _ from 'lodash';
import SyntaxHighlighter from 'react-syntax-highlighter/prism'; // https://github.com/conorhastings/react-syntax-highlighter
import { atomDark } from 'react-syntax-highlighter/styles/prism';

export default class Code extends Component {

  // When a line code (right) is clicked, highlight it and the relevant breakdown
  handleCodeClick = (event) => {
    this.props.onClick(event)
  }

  // Used in Syntax Highlighter to style the lines (I think it can also take onClick functions)
  lineProps = (lineNumber) => {
    if (this.props.activeLines.includes(lineNumber)) {
      return {style: {
        display: "block",
        background: "rgba(255,255,255,0.1)",
      }};
    }
  }

  // Used in Syntax Highlighter to style the numbers
  numberStyle = (lineNumber) => {
    if (!this.props.activeLines.includes(0) && !this.props.activeLines.includes(lineNumber)) {
      return {
        paddingLeft: 16,
        opacity: 0.4,
      };
    } else {
      return {
        paddingLeft: 16,
      }
    }
  }
  
  render() {

    return (
      <SyntaxHighlighter 
        language='typescript'
        style={atomDark}
        showLineNumbers={true}
        wrapLines={true}
        customStyle={{ margin: 0, padding: 0 }}
        lineNumberStyle={this.numberStyle}
        lineProps={this.lineProps}
        onClick={this.handleCodeClick}
      >
        {this.props.code}
      </SyntaxHighlighter>
    );
  }
};