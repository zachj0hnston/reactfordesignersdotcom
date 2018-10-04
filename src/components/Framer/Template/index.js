import React, { Component } from 'react';
import _ from 'lodash';
import MarkdownIt from 'markdown-it'; // https://www.npmjs.com/package/markdown-it#syntax-extensions
import Nav from './Nav';
import LinkedSection from './LinkedSection';
import Code from './Code';
import { 
  Container, Panel, CodeContainer, Story,
  FramerPreviewContainer, FramerPreviewArtwork, FramerPreviewTitle, FramerPreviewSubtext,
} from './style'

export default class Template extends Component {

  state = {
    codeLines: [0],
    activeLines: [0],
  }

  // Before it mounts, create a state with an array of valid code sections
  componentWillMount() {
    this.setCodeLinesState(this.props.content);
  }

  // When esc key pressed, set activeLines back to [0] array to remove focus
  componentDidMount(){
    document.addEventListener("keydown", this.handleEscKey, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleEscKey, false);
  }

  handleEscKey = (event) => {
    if(event.keyCode === 27) {
      this.setState({activeLines: [0]})
    }
  }

  // Helper function that create an array of numbers using Lodash range
  range(start, end) {
    return _.range(start, end + 1);
  }

  // This function helps to find the respective breakdown for each line of code
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


  // When a section (left) is clicked, highlight it and the relevant code
  handleSectionClick = (sectionLines) => {
    this.setState({activeLines: sectionLines});

    // Scroll to that code
    const TOP_LINE = sectionLines[0];
    this.scrollToCode(TOP_LINE);
  }

  // When a line code (right) is clicked, highlight it and the relevant breakdown
  handleCodeClick = (event) => {
    let activeLines;
    const { codeLines } = this.state;
    const target = event.target;
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
      this.scrollToSection();
    }
  }

  scrollToSection = (section) => {

    const OFFSET = 100; // Not sure how to target the right section

    // this.panelRef.scroll({
    //   top: OFFSET,
    //   behavior: 'smooth'
    // })
  }

  scrollToCode = (line) => {

    const OFFSET = line * 21 - 100; // Currently hard coded to 21px as that's hight of each line

    this.codeContainerRef.scroll({
      top: OFFSET,
      behavior: 'smooth'
    });
  }
  
  render() {

    const md = new MarkdownIt();

    const FRAMER_URL = "https://store.framer.com/package/" + this.props.url;
    // const FRAMER_ICON_URL = "https://api.framer.com/store/assets/" + this.props.url + "/icon.png";
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
        <Panel innerRef={(element) => this.panelRef = element}>
          <Nav 
            active={this.props.title}
            home={this.props.home}
          />
          <Story>
            {STORY_BODY}
            {STORY_FOOTER()}
          </Story>
        </Panel>
        <CodeContainer innerRef={(element) => this.codeContainerRef = element}>
          <Code 
            code={this.props.code}
            codeLines={this.state.codeLines}
            activeLines={this.state.activeLines}
            onClick={this.handleCodeClick}
          />
        </CodeContainer>

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
