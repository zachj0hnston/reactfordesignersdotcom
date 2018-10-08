import React, { Component } from 'react';
import Template from '../Template'

export default class PageUnsplash extends Component {

  render() {
    
    return (
      <Template 
        title="Unsplash"
        url="unsplash/unsplash"
        content={content}
        code={code}
      />
    );
  }
};


const content = [
  {text: "This component by Unsplash and Floris Vorloop is a great example of how to reference an very simple API in React. We'll be using `fetch()` to grab an image from source.unsplash.com. Start with the [Props](/framer/translate) component if this is your first time here."},
  
  {title: "Imports", lines: "1-2", text: "These two lines of import are standard for all Framer components. The only thing we added is an import for `Frame` on line 2. You can import all sorts of helpful component from the Framer library like `<Stacks>` and `<Text>` but we don't need those for this component."},
  
  // {title: "Typescript", lines: "4-9", text: "Typescript is a flavor of Javascript that allows us to strictly define what value a variable can store. Typescript is great for preventing bugs caused a variable being or prop being the wrong data type. This component has a width and height prop that should only ever be a `number` and a search prop that should be a `string`. Then on line `11` we tack `<Props>` to the connect these Typescript definitions to our component.  \n\n If you're just getting started with React or if you like living life on the edge, feel free to ignore Typescript for now."},

  {title: "Create the class", lines: "6", text: "We create a new class that extends the core `React.Component` class. We export this new class with the name \"Unsplash\" and it will automatically show up in the Framer component panel as Unsplash."},

  {title: "Default props", lines: "8-10", text: "Properties are how we customize React components. Even the prop's value is likely to be changed, it's nice to give your props a default value. `Size: \"M\"` will default the size property to M (medium)."},

  {title: "Property controls", lines: "13-24", text: "Framer allows us to put custom controls in the right menu of their interface. For this component, we want the user to be able to customize the search string and the size of the image so we create two property controllers. You can learn more about Framer's property controllers [here](https://store.framer.com/package/@framer/benjamin.properties)."},

  {title: "Size controller", lines: "21-22", text: "The enum control type gives users a dropdown to select values. Users will see the optionTitles of `S, M, L, XL` but the true value will be `0, 1, 2, 3` so if M is selected, 1 will be the value of `this.props.size`. We will use this value later as a multiplier in a math equation."},

  {title: "State", lines: "26-28", text: "States are like props except that they can't be edited from the outside. Usually states are used to store (you guessed it) the state of a component. You can have a state"},

  {title: "", lines: "99", text: ""},

  {title: "A note about the lack of Typescript", lines: "4", text: "Typescript is a flavor of Javascript that allows us to strictly define what value a variable can store. Typescript is great for preventing bugs caused a variable or prop being the wrong data type. To keep this guide short, I removed the Typescript bits but you can read about Typescript [here](https://www.typescriptlang.org/docs/handbook/jsx.html) and find the original, Typescript version of this component in the Framer store."},

];


const code = `import * as React from "react";
import { Frame, PropertyControls, ControlType, Animatable } from "framer";

// A note about the lack of Typescript

export class Unsplash extends React.Component {

  static defaultProps = {
    search: "",
    size: "M"
  };

  static propertyControls = {
    search: { 
      type: ControlType.String, 
      title: "Search" 
    },
    size: {
      type: ControlType.Enum,
      title: "Size",
      options: ["0", "1", "2", "3"],
      optionTitles: ["S", "M", "L", "XL"]
    }
  };

  state = {
    url: null
  };

  componentDidMount() {
    this.setImage(this.props);
  }

  componentWillReceiveProps(props) {
    if (props.search !== this.props.search) this.setImage(props);
    if (props.size !== this.props.size) this.setImage(props);
  }

  async setImage({ size, search }) {
    var currentSize = 400 + Number(size) * 400;
    const baseUrl = "https://source.unsplash.com";
    const route = search === "" ? "/random" : \`/featured\`;
    const url = \`\${baseUrl}\${route}/\${currentSize}x\${currentSize}?\${search}\`;
    const response = await fetch(url);
    this.setState({ url: response.url });
  }

  render() {
    const { width, height } = this.props;

    return (
      <Frame width={width} height={height} background="white">
        <div
          style={{
            width: width,
            height: height,
            backgroundImage: \`url(\${this.state.url})\`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#999",
              textAlign: "center",
              zIndex: -1,
              position: "relative"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="26.156">
              <path
                d="M 19.5 15.094 C 19.5 17.625 17.438 19.594 15 19.594 C 12.563 19.594 10.5 17.625 10.5 15.094 C 10.5 12.563 12.563 10.594 15 10.594 C 17.531 10.688 19.5 12.656 19.5 15.094 Z M 30 8.156 L 30 22.125 C 30 24.281 28.219 26.156 25.969 26.156 L 4.031 26.156 C 1.781 26.156 0 24.375 0 22.125 L 0 8.063 C 0 5.906 1.781 4.031 4.031 4.031 L 7.5 4.031 L 8.25 1.875 C 8.625 0.844 9.844 0 10.969 0 L 19.031 0 C 20.156 0 21.375 0.844 21.75 1.875 L 22.5 4.125 L 25.969 4.125 C 28.219 4.125 30 5.906 30 8.156 Z M 21.938 15.188 C 21.938 11.344 18.844 8.156 14.906 8.156 C 11.063 8.156 7.875 11.344 7.875 15.188 C 7.875 19.031 10.969 22.219 14.906 22.219 C 18.844 22.125 21.938 19.031 21.938 15.188 Z"
                fill="rgb(204,204,204)"
              />
            </svg>
            <p>Loading image...</p>
          </div>
        </div>
      </Frame>
    );
  }
}


`;

