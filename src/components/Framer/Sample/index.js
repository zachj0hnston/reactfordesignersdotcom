import React, { Component } from 'react';
import _ from 'lodash';
import MarkdownIt from 'markdown-it'; // https://www.npmjs.com/package/markdown-it#syntax-extensions
import SyntaxHighlighter from 'react-syntax-highlighter/prism'; // https://github.com/conorhastings/react-syntax-highlighter
import { atomDark } from 'react-syntax-highlighter/styles/prism';
import LinkedSection from '../LinkedSection';
import { 
  Container, Panel, Main, Story,
  Header, HeaderBack, HeaderIcon, HeaderTitle
} from './style'

// Use https://github.com/rexxars/react-markdown/blob/master/demo/src/demo.js
// Prove that markdown can be used for the text half
// Then put markdown text to linked sections
// Pull out code snippet and place in code side
// Pull out multiple code snippets and combine them
// Hard part: Detect which text points to which code

class FramerSample extends Component {
  state = {
    activeLines: [0],
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

  // When a section (left) is clicked, highlight it and the relevant code
  handleSectionClick = (sectionLines) => {
    this.setState({activeLines: sectionLines})
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
    const result = md.render('# markdown-it rulezz!');
    const renderMarkdown = <div dangerouslySetInnerHTML={{__html:result}} />;
    
    return (
      <Container>
      
        <Panel>
          <Header>
            <HeaderIcon></HeaderIcon>
            <HeaderTitle>Translate</HeaderTitle>
            <HeaderBack></HeaderBack>
          </Header>

          <Story>

            {renderMarkdown}

            <p>The Translate component takes in a text string and translates it to another language using the Google Translate API. Let’s breakdown the code.</p>
            
            {/* LinkedSections are just blocks of text that highlight code when clicked */}
            <LinkedSection 
              title="Imports"
              lines={this.range(1,2)}
              activeLines={this.state.activeLines}
              onClick={this.handleSectionClick}
            >
              <p>We start by importing * or everything from React. Every code component has this so just leave it as is. We also import Frame, PropertyControls, and ControlType from Framer. Framer is the library that contains tons of helpful components and functions. Read more about what you can import from Framer here.</p>
            </LinkedSection>

            <LinkedSection 
              title="Default Props"
              lines={this.range(6,22)}
              activeLines={this.state.activeLines}
              onClick={this.handleSectionClick}
            >
              <p>Now that we've imported. We can start by importing * or everything from React. Every code component has this so just leave it as is. We also import Frame, PropertyControls, and ControlType from Framer. Framer is the library that contains tons of helpful components and functions. Read more about what you can import from Framer here.</p>
            </LinkedSection>

            <LinkedSection 
              title="Property Controls"
              lines={this.range(23,91)}
              activeLines={this.state.activeLines}
              onClick={this.handleSectionClick}
            >
              <p>Now that we've imported. We can start by importing * or everything from React. Every code component has this so just leave it as is. We also import Frame, PropertyControls, and ControlType from Framer. Framer is the library that contains tons of helpful components and functions. Read more about what you can import from Framer here.</p>
            </LinkedSection>
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
          >
            {CODE_STRING}
          </SyntaxHighlighter>
        </Main>

      </Container>
    );
  }
}

// This blob of code needs to be moved somewhere better
const CODE_STRING = `import * as React from "react";
import { Frame, PropertyControls, ControlType } from "framer";

export class Translate_Text extends React.Component {

    static defaultProps = {
        width: 150,
        height: 30,
        text: "Hello"
        language: "🇺🇸",
        languageExt: "en",
        apikey: "",
        typeface: "Helvetica",
        custom: "",
        weight: 400,
        size: 16,
        line: 1.2,
        color: "black",
        align: "center",
        background: "rgba(0,0,0,0)",
        radius: 0,
    };
    static propertyControls = {
        text: {
            type: ControlType.String,
            title: "Text",
            placeholder: "Write something",
        },
        language: {
            type: ControlType.SegmentedEnum,
            title: "Translate to",
            options: ["🇺🇸", "🇯🇵", "🇩🇪", "•••"],
        },
        languageExt: {
            type: ControlType.Enum,
            title: "↳ More",
            options: ["en", "af", "ach", "ak", "am", "ar", "az", "be", "bem", "bg", "bh", "bn", "br", "bs", "ca", "chr", "ckb", "co", "crs", "cs", "cy", "da", "de", "ee", "el", "en", "eo", "es", "es-419", "et", "eu", "fa", "fi", "fo", "fr", "fy", "ga", "gaa", "gd", "gl", "gn", "gu", "ha", "haw", "hi", "hr", "ht", "hu", "hy", "ia", "id", "ig", "is", "it", "iw", "ja", "jw", "ka", "kg", "kk", "km", "kn", "ko", "kri", "ku", "ky", "la", "lg", "ln", "lo", "loz", "lt", "lua", "lv", "mfe", "mg", "mi", "mk", "ml", "mn", "mo", "mr", "ms", "mt", "ne", "nl", "nn", "no", "nso", "ny", "nyn", "oc", "om", "or", "pa", "pcm", "pl", "ps", "pt-BR", "pt-PT", "qu", "rm", "rn", "ro", "ru", "rw", "sd", "sh", "si", "sk", "sl", "sn", "so", "sq", "sr", "sr-ME", "st", "su", "sv", "sw", "ta", "te", "tg", "th", "ti", "tk", "tl", "tn", "to", "tr", "tt", "tum", "tw", "ug", "uk", "ur", "uz", "vi", "wo", "xh", "xx-bork", "xx-elmer", "xx-hacker", "xx-klingon", "xx-pirate", "yi", "yo", "zh-CN", "zh-TW", "zu"],
            hidden(props) {
                return props.language !== "•••"
            },
        }
        apikey: {
            type: ControlType.String,
            title: "API Key",
            placeholder: "Enter your key",
        },
        typeface: {
            type: ControlType.Enum,
            title: "Typeface",
            options: ["Helvetica", "Arial", "Times", "Courier", "Verdana", "Tahoma"],
        }
        weight: {
            type: ControlType.Number,
            title: "Weight",
            max: 800,
            min: 100,
            step: 100,
        },
        size: {
            type: ControlType.Number,
            title: "Size",
            max: 200,
            min: 1,
        },
        color: {
            type: ControlType.Color,
            title: "Color",
        },
        line: {
            type: ControlType.Number,
            title: "Line-height",
            max: 4,
            min: 0,
            step: 0.1,
        },
        align: {
            type: ControlType.SegmentedEnum,
            title: "Align",
            options: ["left", "center", "right"],
        },
        background: {
            type: ControlType.Color,
            title: "Background",
        },
        radius: {
            type: ControlType.Number,
            title: "Radius",
            max: 50,
            min: 0,
        },
    };

    state = {
        text: "Hello";
    };

    translate = (text = "hello", toLang = "ru", fromLang = "en") => {
        if (this.props.apikey) {
            this.paidGoogleTranslate(text, toLang, fromLang)
        } else {
            this.freeGoogleTranslate(text, toLang, fromLang)
        }
    }

    // This free API will break after a dozen or so requests. Inspired by: https://ctrlq.org/code/19909-google-translate-api
    freeGoogleTranslate = (text, toLang, fromLang) => {
           

        fetch(url, { 
            method: 'GET'
        })
        .then(res => res.json())
        .then((response) => {
            let translatedText = response[0][0][0];
            this.setState({text: translatedText});
        })
        .catch(error => {
            this.setState({text: "Quota limit hit. Enter a Google Cloud API Key."});
            console.log("There was an error with the translation request: ", error);
        });
    }

    // The official Google Cloud API for Translate.
    paidGoogleTranslate = (text, toLang, fromLang) => {

        // 'AIzaSyDw7UEAvRdCRUnX3l4tdHDyTz4hH-Qjycc'
        const API_KEY = this.props.apikey;


        fetch(url, { 
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
        .then(res => res.json())
        .then((response) => {
            let translatedText = response.data.translations[0].translatedText;
            this.setState({text: translatedText});
        })
        .catch(error => {
            console.log("There was an error with the translation request: ", error);
        });
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.language !== this.props.language || nextProps.languageExt !== this.props.languageExt || nextProps.text !== this.props.text) {

            if (nextProps.language === "•••") {
                this.translate(nextProps.text, nextProps.languageExt);
            } else if (nextProps.language === "🇯🇵") {
                this.translate(nextProps.text, 'ja');
            } else if (nextProps.language === "🇩🇪") {
                this.translate(nextProps.text, 'de');
            } else {
                this.setState({text: nextProps.text});
            }
        }
    }

    render() {

        return (
            <div style={{
                height: "100%",
                width: "100%",
                fontFamily: this.props.typeface,
                fontWeight: this.props.weight,
                fontSize: this.props.size,
                lineHeight: this.props.line,
                color: this.props.color,
                textAlign: this.props.align,
                background: this.props.background,
                borderRadius: this.props.radius,
                }}>

            {this.state.text}
            
            </div>
        );
    }
}

`;

export default FramerSample;
