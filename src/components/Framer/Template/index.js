import React, { Component } from 'react';
import _ from 'lodash';
import MarkdownIt from 'markdown-it'; // https://www.npmjs.com/package/markdown-it#syntax-extensions
import SyntaxHighlighter from 'react-syntax-highlighter/prism'; // https://github.com/conorhastings/react-syntax-highlighter
import { atomDark } from 'react-syntax-highlighter/styles/prism';
import Nav from './Nav';
import LinkedSection from './LinkedSection';
import { 
  Container, Panel, Main, Story,
  FramerPreviewContainer, FramerPreviewArtwork, FramerPreviewTitle, FramerPreviewSubtext,
} from './style'

// Use https://github.com/rexxars/react-markdown/blob/master/demo/src/demo.js
// Prove that markdown can be used for the text half
// Then put markdown text to linked sections
// Pull out code snippet and place in code side
// Pull out multiple code snippets and combine them
// Hard part: Detect which text points to which code

export default class Template extends Component {

  state = {
    activeLines: [0],
  }

  // When esc key pressed, set activeLines back to [0] array to remove focus
  componentDidMount(){
    document.addEventListener("keydown", this.handleEscKey, false);
  }

  componentWillMount() {
    this.setCodeLinesState(this.props.content);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleEscKey, false);
  }

  // This state helps to find the respective breakdown for each line of code
  setCodeLinesState = (content) => {
    let lines = content.filter(el => el.hasOwnProperty('lines'))
    const codeLines = lines.map( el => {
      const start = parseInt(el.lines.match(/[^-]*/i)[0]);
      const end = parseInt(el.lines.match(/[^-]*$/i)[0]) + 1;
      const range = _.range(start, end);
      return range;
    })
    this.setState({codeLines});
  }

  handleEscKey = (event) => {
    if(event.keyCode === 27) {
      this.setState({activeLines: [0]})
    }
  }

  // When a section (left) is clicked, highlight it and the relevant code
  handleSectionClick = (sectionLines) => {
    this.setState({activeLines: sectionLines});
  }

  // When a line code (right) is cliked, highlight it and the relevant breakdown
  handleCodeClick = (event) => {
    let activeLines;
    const { codeLines } = this.state;
    const target = event.target
    let wrapper = target.parentNode;
    
    // Go upper in the DOM if is a nested span
    if(wrapper.tagName == 'SPAN') {
      wrapper = wrapper.parentNode;
    }

    // Get index position from clicked element (span)
    const index = Array.from(wrapper.children).indexOf(target.parentNode) + 1;
    
    // Check if it is a valid line of code was clicked
    if(index != 0) {
      activeLines = codeLines.find(el => { return el.includes(index); } );
    }

    // If we have a valid activeLines, then set the new State
    if(activeLines) {
      this.setState({activeLines});
    }
  }

  // Helper function that create an array of numbers using Lodash range
  range(start, end) {
    return _.range(start, end + 1);
  }

  // Used in Syntax Highlighter to style the lines (I think it can also take onClick functions)
  lineProps = (lineNumber) => {
    if (this.state.activeLines.includes(lineNumber)) {
      return {style: {
        display: "block",
        background: "rgba(255,255,255,0.1)",
      }};
    }
  }
  

  // Used in Syntax Highlighter to style the numbers
  numberStyle = (lineNumber) => {
    if (!this.state.activeLines.includes(0) && !this.state.activeLines.includes(lineNumber)) {
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

    const md = new MarkdownIt();

    const FRAMER_URL = "https://store.framer.com/package/" + this.props.url;
    const FRAMER_ICON_URL = "https://api.framer.com/store/assets/" + this.props.url + "/icon.png";
    const FRAMER_ARTWORK_URL = "https://api.framer.com/store/assets/" + this.props.url + "/artwork.png";

    const STORY_BODY = this.props.content.map((object, index) => {

      const TITLE = object.title;
      
      let lines;
      if (object.lines) {
        const SPLIT = object.lines.split("-");
        let start = SPLIT[0];
        let end = SPLIT[1]++;
            end++; // add 1 since arrays start from 0
        lines = _.range(start, end);
      }

      const TEXT = <div dangerouslySetInnerHTML={{__html:md.render(object.text)}} />;
      
      return (
        <LinkedSection 
          title={TITLE}
          lines={lines}
          activeLines={this.state.activeLines}
          onClick={this.handleSectionClick}
          key={TITLE}
        >
          {TEXT}
        </LinkedSection>
      );
    });

    const STORY_FOOTER = () => {
      if (!this.props.home) {
        return (
          <FramerPreview
            url={FRAMER_URL}
            artworkURL={FRAMER_ARTWORK_URL}
            title={this.props.title}
          />
        )
      }
    };
    
    
    return (
      <Container>
      
        <Panel>

          <Nav 
            active={this.props.title}
            home={this.props.home}
          />

          <Story>
            {STORY_BODY}
            {STORY_FOOTER()}
          </Story>
        </Panel>
        <Main>
          <SyntaxHighlighter 
            language='typescript'
            style={atomDark}
            showLineNumbers={true}
            wrapLines={true}
            customStyle={{
              margin: 0,
              padding: 0,
            }}
            lineNumberStyle={this.numberStyle}
            lineProps={this.lineProps}
            onClick={this.handleCodeClick}
          >
            {this.props.code}
          </SyntaxHighlighter>
        </Main>

      </Container>
    );
  }
};



class FramerPreview extends Component {

  render() {

    return (
      <FramerPreviewContainer href={this.props.url}>
        <FramerPreviewArtwork imageURL={this.props.artworkURL}></FramerPreviewArtwork>
        <FramerPreviewTitle>{this.props.title}</FramerPreviewTitle>
        <FramerPreviewSubtext>Open in the Framer Store</FramerPreviewSubtext>
        <svg xmlns="http://www.w3.org/2000/svg"><path d="M 0 0 L 14 0 L 14 7 L 7 7 Z" fill="#000"></path><path d="M 0 7 L 7 7 L 14 14 L 0 14 Z" fill="#000"></path><path d="M 0 14 L 7 14 L 7 21 Z" fill="#000"></path></svg>
      </FramerPreviewContainer>
    );
  }
}
