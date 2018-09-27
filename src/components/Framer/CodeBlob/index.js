import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { atomDark } from 'react-syntax-highlighter/styles/prism';

class CodeBlob extends Component {
  
  render() {

    return (
        <SyntaxHighlighter 
        language='typescript'
        style={atomDark}
        showLineNumbers={true}
        wrapLines={true}
        lineProps={lineNumber => {
            if (![4].includes(lineNumber)) {
            return {style: {
                opacity: 0.45
            }};
            }
        }}
        >
            {CODE_STRINGG}
        </SyntaxHighlighter>
    );
  }
}


export default CodeBlob;
