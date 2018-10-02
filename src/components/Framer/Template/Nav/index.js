import React, { Component } from 'react';
import { Container, NavItem, NavItemIcon, NavItemTitle } from './style'

export default class Nav extends Component {

  state = {
    open: false
  }

  componentDidMount() {
    this.props.home ? this.setState({open: true}) : "";
  }

  handleClick = () => {
    this.state.open ? this.setState({open: false}) : this.setState({open: true});
  }

  render() {    

    const NAV_LIST = TOC.map((object, index) => {

      const TITLE = object.title;
      const isActive = this.props.active === object.title;
      const URL = "/framer/" + object.title.toLowerCase();
      const FRAMER_ICON_URL = "https://api.framer.com/store/assets/" + object.url + "/icon.png";
      
      if (isActive) {
        return (
          <NavItem className="active" key={TITLE}>
            <NavItemIcon imageURL={FRAMER_ICON_URL} />
            <NavItemTitle>{TITLE}</NavItemTitle>
          </NavItem>
        )
      } else {
        return (
          <NavItem href={URL} key={TITLE}>
            <NavItemIcon imageURL={FRAMER_ICON_URL} />
            <NavItemTitle>{TITLE}</NavItemTitle>
          </NavItem>
        )
      }
    });
    
    return (
      <Container 
        open={this.state.open}
        home={this.props.home}
        onClick={this.handleClick}
      >
        
        <svg width="18px" height="12px" viewBox="0 0 18 12">
            <g>
              <path d="M1.13504161,0 L16.8649584,3.77475828e-15 C17.4172431,3.67330522e-15 17.8649584,0.44771525 17.8649584,1 C17.8649584,1.23393651 17.7829422,1.4604694 17.6331797,1.6401844 L9.76822128,11.0781345 C9.4146572,11.5024114 8.7840925,11.5597354 8.3598156,11.2061713 C8.31335254,11.1674521 8.27049794,11.1245975 8.23177872,11.0781345 L0.366820333,1.6401844 C0.013256252,1.2159075 0.0705803158,0.585342801 0.494857213,0.23177872 C0.674572214,0.0820162194 0.901105108,9.31151859e-16 1.13504161,8.8817842e-16 Z"></path>
            </g>
        </svg>

        {NAV_LIST}
        
      </Container>
    );
  }
}


const TOC = [
  {title: "Translate", url: "zach/translate"},
  {title: "Unsplash", url: "unsplash/unsplash"},
];