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
  {text: "This is an introo."},
  {title: "Imports", lines: "1-2", text: "Now that we've imported. We can start by importing."},
  {title: "Other", lines: "3-9", text: "Cool. Now that we've imported. We can start by importing."},
];


const code = `import * as React from "react";
import { Frame, PropertyControls, ControlType, Animatable } from "framer";

enum Sizes {
  S,
  M,
  L,
  XL
}

interface Props {
  width: number;
  height: number;
  search: string;
  size: string;
}

export class Unsplash extends React.Component<Props> {
  static defaultProps = {
    url: null,
    search: "",
    size: "M"
  };

  static propertyControls: PropertyControls<Props> = {
    search: { type: ControlType.String, title: "Search" },
    size: {
      type: ControlType.Enum,
      title: "Size",
      options: ["S", "M", "L", "XL"]
    }
  };

  state = {
    url: null
  };

  componentDidMount() {
    this.setImage(this.props);
  }

  componentWillReceiveProps(props: Props) {
    if (props.search !== this.props.search) this.setImage(props);
    if (props.size !== this.props.size) this.setImage(props);
  }

  async setImage({ size, search }: Props) {
    var currentSize = 400 + Sizes[size] * 400;
    const baseUrl = "https://source.unsplash.com";
    const route = search === "" ? "/random" : '/featured';
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

