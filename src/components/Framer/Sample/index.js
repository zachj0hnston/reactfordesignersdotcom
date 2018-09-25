import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { atomDark } from 'react-syntax-highlighter/styles/prism';
import { 
  Container, Panel, Main, Story,
  Header, HeaderBack, HeaderIcon, HeaderTitle,
  TextParagraph, TextTitle
} from './style'

class FramerSample extends Component {
  
  render() {

    return (
      <Container>

        <Panel>
            <Header>
                {/* <HeaderBack></HeaderBack> */}
                <HeaderIcon></HeaderIcon>
                <HeaderTitle>Translate</HeaderTitle>
            </Header>
            <Story>
              <TextParagraph>The Translate component takes in a text string and translates it to another language using the Google Translate API. Let’s breakdown the code.</TextParagraph>
              
              <TextTitle>Imports</TextTitle>
              <TextParagraph>We start by importing * or everything from React. Every code component has this so just leave it as is. We also import Frame, PropertyControls, and ControlType from Framer. Framer is the library that contains tons of helpful components and functions. Read more about what you can import from Framer here.</TextParagraph>
            
              <TextTitle>Property Controls</TextTitle>
              <TextParagraph>In order to mimic the functionality of a normal text layer, we create a Property Control for 13 different properties like typeface, size, and color. Let’s take a look at the translation properties.</TextParagraph>

              <TextTitle>Property Controls</TextTitle>
              <TextParagraph>In order to mimic the functionality of a normal text layer, we create a Property Control for 13 different properties like typeface, size, and color. Let’s take a look at the translation properties.</TextParagraph>

              <TextTitle>Property Controls</TextTitle>
              <TextParagraph>In order to mimic the functionality of a normal text layer, we create a Property Control for 13 different properties like typeface, size, and color. Let’s take a look at the translation properties.</TextParagraph>

              <TextTitle>Property Controls</TextTitle>
              <TextParagraph>In order to mimic the functionality of a normal text layer, we create a Property Control for 13 different properties like typeface, size, and color. Let’s take a look at the translation properties.</TextParagraph>
            </Story>
        </Panel>
        <Main>
          <SyntaxHighlighter 
            language='typescript'
            style={atomDark}
            showLineNumbers={true}
          >
            {CODE_STRINGG}
          </SyntaxHighlighter>
        </Main>

      </Container>
    );
  }
}

const CODE_STRINGG = `import * as React from "react";
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
