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

    // Change zoom level (hack for mobile phones)
    var metaTag=document.createElement('meta');
    metaTag.name = "viewport"
    metaTag.content = "width=1200"
    document.getElementsByTagName('head')[0].appendChild(metaTag);
  }

  // When esc key pressed, set activeLines back to [0] array to remove focus
  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyboardControls, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyboardControls, false);
  }

  handleKeyboardControls = (event) => {

    const CODE = event.keyCode;

    // Esc: Lose focus
    if(CODE === 27) {
      this.setState({activeLines: [0]})
    }

    // Down/Right: Next section
    if(CODE === 40 || CODE === 39) {
      this.goToSection("next");
    }

    // Up/Left: Previous section
    if(CODE === 38 || CODE === 37) {
      this.goToSection("back");
    }
  }

  goToSection = (where) => {

    const CODE_LINES = this.state.codeLines;
    const ACTIVE_LINES = this.state.activeLines;
    let codeLinesHash = {};
    let activeLinesIndex;
    let newActiveLines;

    for(var i = 0; i < CODE_LINES.length; i++) {
      codeLinesHash[CODE_LINES[i]] = i;
    }
    
    if(codeLinesHash.hasOwnProperty(ACTIVE_LINES)) {
      activeLinesIndex = codeLinesHash[ACTIVE_LINES];
    }

    if (where === "next") {
      activeLinesIndex++;
    }

    if (where === "back") {
      activeLinesIndex--;
    }

    // If it reaches the end, loop back to beginning
    if (activeLinesIndex > CODE_LINES.length - 1) {
      activeLinesIndex = 0;
    }

    // And if before beginning, go to end
    if (activeLinesIndex < 0) {
      activeLinesIndex = CODE_LINES.length - 1;
    }

    newActiveLines = CODE_LINES[activeLinesIndex];

    this.setState({activeLines: newActiveLines})
    
  }

  // This function helps to find the respective breakdown for each line of code
  setCodeLinesState = (content) => {

    // Scan the content blob and pull out the lines properties
    let lines = content.filter(el => el.hasOwnProperty('lines'));

    // Map through the lines, find lowest and highest numbers, then output a range
    const codeLines = lines.map( el => {
      const start = parseInt(el.lines.match(/[^-]*/i)[0]);
      const end = parseInt(el.lines.match(/[^-]*$/i)[0]) + 1; // Add one since code starts at 1 not zero
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
    const LINE_BLOCK = this.identifyLineBlock(event.target);
    LINE_BLOCK ? this.setState({activeLines: LINE_BLOCK}) : "";
  }

  identifyLineBlock = (target) => {

    let targetEl = target;
    let wrapperEl = target.parentNode;

    // Go upper in the DOM if is a nested span
    if(wrapperEl.tagName == 'SPAN') {
      wrapperEl = wrapperEl.parentNode;
      targetEl = targetEl.parentNode;
    }

    // Get index position from clicked element (span)
    const index = Array.from(wrapperEl.children).indexOf(targetEl) + 1;
    console.log(index);
    
    // Check if it is a valid line of code was clicked
    if(index != 0) {

      // Based on the line number that was clicked find which array of numbers includes it
      return this.state.codeLines.find(el => { return el.includes(index); } );
    }
  }

  scrollToCode = (line) => {

    const OFFSET = line * 21 - 200; // Currently hard coded to 21px as that's hight of each line

    this.codeContainerRef.scroll({
      top: OFFSET,
      behavior: 'smooth'
    });
  }
  
  render() {

    const md = new MarkdownIt({
      html: true,
      breaks: true,
      linkify: true,
    });

    const FRAMER_URL = "https://store.framer.com/package/" + this.props.url;
    // const FRAMER_ICON_URL = "https://api.framer.com/store/assets/" + this.props.url + "/icon.png";
    const FRAMER_ARTWORK_URL = "https://api.framer.com/store/assets/" + this.props.url + "/artwork.png";

    const STORY_BODY = this.props.content.map((object, index) => {

      const TITLE = object.title;
      
      const TEXT = <div dangerouslySetInnerHTML={{__html:md.render(object.text)}} />;
      
      return (
        <LinkedSection 
          title={TITLE}
          lines={object.lines}
          activeLines={this.state.activeLines}
          onClick={this.handleSectionClick}
          key={index}
        >
          {TEXT}
        </LinkedSection>
      );
    });

    const STORY_FOOTER = () => {
      if (!this.props.home) {
        return (
          <div>
            <FramerPreview
              url={FRAMER_URL}
              artworkURL={FRAMER_ARTWORK_URL}
              title={this.props.title}
            />
            <h3>p.s.</h3>
            <p>I plan to publish more of these guides in the future. I don't have a fancy mailing list but you can <a href="https://twitter.com/zach__johnston">follow me on Twitter</a> for updates. </p>
          </div>
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
