import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';
import Color from 'color';

class ResourceCard extends Component {

  constructor(props, nextProps) {
    super(props);
    this.state = {
      componentDidMount: false,
      shouldAnimate: false,
    }
  }

  componentDidMount = () => {
    this.setState({ componentDidMount: true });
    this.updateCoordinates();
  }

  componentWillReceiveProps (newProps) {
    if (newProps.isZoomed !== this.props.isZoomed && this.props.isZoomed) {
      this.props.onClose();
      this.setState({ shouldAnimate: true });
    }
  }

  componentDidUpdate() {
    this.updateCoordinates();
  }

  handleClick = () => {
    if (!this.props.isZoomed) {
      this.props.onSelect(this.props.id);
      this.updateCoordinates();
      this.setState({ shouldAnimate: true });
    }
  }

  handleOverlayClick = () => {
    this.props.onClose();
    this.updateCoordinates();
    this.setState({ shouldAnimate: true });
  }

  handleAnimationEnd = () => {
    this.setState({ shouldAnimate: false });
  }

  cardSmallStyles = null;
  cardSmallSprings = null;
  cardLargeStyles = null;
  cardLargeSprings = null;

  updateCoordinates() {

    const cardSpringPhysics = {
      stiffness: 500,
      damping: 40,
    };

    const HEROHEIGHT = 260;
    const CARDHEIGHT = 200 + HEROHEIGHT + this.bodyContainerElement.getBoundingClientRect().height;
    const CARDWIDTH = 500;

    let cardSmallBoundingBox = this.smallBoxElement.getBoundingClientRect();

    this.cardSmallStyles = {
      top: 0,
      left: 0,
      width: cardSmallBoundingBox.width,
      height: cardSmallBoundingBox.height,
      fadeIn: 0,
      fadeOut: 1,
      heroHeight: 80,
      heroMargin: 0,
      headerFontSize: 20,
      bodyWidth: CARDWIDTH,
      bodyTop: 330 - 140,
    };

    // The spring version of cardSmallStyles. Should mirror.
    this.cardSmallSprings = {
      top: spring(this.cardSmallStyles.top, cardSpringPhysics),
      left: spring(this.cardSmallStyles.left, cardSpringPhysics),
      width: spring(this.cardSmallStyles.width, cardSpringPhysics),
      height: spring(this.cardSmallStyles.height, cardSpringPhysics),
      fadeIn: spring(this.cardSmallStyles.fadeIn, cardSpringPhysics),
      fadeOut: spring(this.cardSmallStyles.fadeOut, cardSpringPhysics),
      heroHeight: spring(this.cardSmallStyles.heroHeight, cardSpringPhysics),
      heroMargin: spring(this.cardSmallStyles.heroMargin, cardSpringPhysics),
      headerFontSize: spring(this.cardSmallStyles.headerFontSize, cardSpringPhysics),
      bodyWidth: spring(this.cardSmallStyles.bodyWidth, cardSpringPhysics),
      bodyTop: spring(this.cardSmallStyles.bodyTop, cardSpringPhysics),
    };

    this.cardLargeStyles = {
      top: ((window.innerHeight - CARDHEIGHT) / 2) - cardSmallBoundingBox.top,
      left: ((window.innerWidth - CARDWIDTH) / 2) - cardSmallBoundingBox.left,
      width: CARDWIDTH,
      height: CARDHEIGHT,
      fadeIn: 1,
      fadeOut: 0,
      heroHeight: HEROHEIGHT,
      heroMargin: -17,
      headerFontSize: 28,
      bodyWidth: CARDWIDTH,
      bodyTop: 370,
    };

    // The spring version of cardLargeStyles. Should mirror.
    this.cardLargeSprings = {
      top: spring(this.cardLargeStyles.top, cardSpringPhysics),
      left: spring(this.cardLargeStyles.left, cardSpringPhysics),
      width: spring(this.cardLargeStyles.width, cardSpringPhysics),
      height: spring(this.cardLargeStyles.height, cardSpringPhysics),
      fadeIn: spring(this.cardLargeStyles.fadeIn, cardSpringPhysics),
      fadeOut: spring(this.cardLargeStyles.fadeOut, cardSpringPhysics),
      heroHeight: spring(this.cardLargeStyles.heroHeight, cardSpringPhysics),
      heroMargin: spring(this.cardLargeStyles.heroMargin, cardSpringPhysics),
      headerFontSize: spring(this.cardLargeStyles.headerFontSize, cardSpringPhysics),
      bodyWidth: spring(this.cardLargeStyles.bodyWidth, cardSpringPhysics),
      bodyTop: spring(this.cardLargeStyles.bodyTop, cardSpringPhysics),
    };
  }

  renderCard() {

    const cardDefaultStyles = {
      top: 0,
      left: 0,
      fadeIn: 0,
      fadeOut: 1,
      heroHeight: 80,
      heroMargin: 0,
      headerFontSize: 20,
      bodyWidth: 0,
      bodyTop: 0,
    };

    const getCardContent = (styles = {}) => {

      let cardStyles;
      if (styles.width) {
        cardStyles = {
          top: `${styles.top}px`,
          left: `${styles.left}px`,
          width: `${styles.width}px`,
          height: `${styles.height}px`,
        }
      } else {
        cardStyles = {
          top: `${styles.top}px`,
          left: `${styles.left}px`,
        }
      }

      const SRCICON = process.env.PUBLIC_URL + '/images/icon-' + this.props.id + '.png';
      const SRCIMAGE = process.env.PUBLIC_URL + '/images/image-' + this.props.id + '.png';

      const HUE = Color(this.props.color).hsl().color[0];
      const BTNBGCOLOR = Color({h:HUE, s:5, l: 95}).hex();
      const BTNTEXTCOLOR = Color({h:HUE, s:100, l: 20}).hex();
      const TEXTLIGHTCOLOR = Color({h:HUE, s:5, l: 50}).hex();
      const TEXTDARKCOLOR = Color({h:HUE, s:100, l: 5}).hex();

      return (
        <div
          ref={(element) => this.smallBoxElement = element}
          className="resource-card__container">

          <div
            ref={(element) => this.rootElement = element}
            style={cardStyles}
            className={`resource-card${this.props.isZoomed || this.state.shouldAnimate ? ' resource-card--selected' : ""}`}
            onClick={this.handleClick}>
            <div
              className="resource-card__hero"
              style={{
                background: this.props.color,
                height: `${styles.heroHeight}px`,
                margin: `${styles.heroMargin}px`,
              }}>
              <div
                className="hero__icon"
                style={{
                  opacity: `${styles.fadeOut}`,
                }}>
                <img src={SRCICON} />
              </div>
              <div
                className="hero__image"
                style={{
                  opacity: `${styles.fadeIn}`,
                }}>
                <img src={SRCIMAGE} />
              </div>
            </div>
            <div
              className="resource-card__title"
              style={{
                fontSize: `${styles.headerFontSize}px`,
                color: TEXTDARKCOLOR,
              }}>
              {this.props.title}
            </div>
            <div
              className="resource-card__description"
              style={{
                color: TEXTLIGHTCOLOR,
              }}>
              {this.props.description}
            </div>
            <div
              className="resource-card__description"
              style={{
                color: TEXTLIGHTCOLOR,
              }}>
              {!this.props.length ? null : (<span>{this.props.length}</span>)}
              {!this.props.cost ? null : (<span> • {this.props.cost}</span>)}
            </div>
            <div
              ref={(element) => this.bodyContainerElement = element}
              className="resource-card__body-container"
              style={{
                top: `${styles.bodyTop}px`,
                opacity: `${styles.fadeIn}`,
              }}>
              <div
                className="resource-card__body"
                style={{
                  width: `${500}px`, // todo: set with CARDWIDTH
                }}>
                {this.props.body}
              </div>
            </div>
            <div className="resource-card__footer">
              <a
                onClick={(e) => e.stopPropagation()}
                className="resource-card__button"
                href={this.props.url}
                style={{
                  color: BTNTEXTCOLOR,
                  background: BTNBGCOLOR,
                }}>
                {this.props.cta}
              </a>
            </div>
          </div>
          { this.props.isZoomed &&
            <div className="resource-card__overlay" onClick={this.handleOverlayClick}></div>
          }
        </div>
      );
    }

    if (!this.state.shouldAnimate) {

      // (1) Not Zoomed
      if (!this.props.isZoomed) {
        return getCardContent(cardDefaultStyles);

      // (2) Zoomed
      } else {
        return getCardContent(this.cardLargeStyles);
      }
    } else {
      // (3) Zooming large
      if (this.props.isZoomed) {
        return (
          <Motion defaultStyle={this.cardSmallStyles} style={this.cardLargeSprings} onRest={this.handleAnimationEnd}>
            {(interpolatingStyles) => {
              return getCardContent({...this.cardLargeStyles, ...interpolatingStyles})
            }}
          </Motion>
        );

      // (4) Zooming small
      } else {
        return (
          <Motion defaultStyle={this.cardLargeStyles} style={this.cardSmallSprings} onRest={this.handleAnimationEnd}>
            {(interpolatingStyles) => {
              return getCardContent({...this.cardSmallStyles, ...interpolatingStyles})
            }}
          </Motion>
        )
      }
    }
  }

  render() {
    return (this.renderCard())
  }
}


export default ResourceCard;
