import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';


class ResourceCard extends Component {

  constructor(props, nextProps) {
    super(props);
    this.state = {
      shouldAnimate: false,
    }
  }

  rootElementBoundingRect = null;
  rootElementParentBoundingRect = null;

  handleClick = () => {
    this.props.onSelect(this.props.id);
    this.setState({ shouldAnimate: true });
  }

  handleOverlayClick = () => {
    this.props.onClose();
    this.setState({ shouldAnimate: true });
  }

  componentDidMount = () => {

    const boundingRect = this.rootElement.getBoundingClientRect();
    this.rootElementBoundingRect = boundingRect;

    const parentBoundingRect = this.rootElement.parentElement.getBoundingClientRect();
    this.rootElementParentBoundingRect = parentBoundingRect;
  }

  handleAnimationEnd = () => {
    this.setState({ shouldAnimate: false });
  }

  render() {

    // const HASLOADED = this.rootElementBoundingRect;

    const resourceCardOpenStyle = {
      position: 'fixed',
      left: 200,
      top: 200,
      height: 600,
      width: 500,
      zIndex: 100,
    };

    // const resourceCardClosedStyle = {
    //   position: 'fixed',
    //   left: 200,
    //   top: 200,
    //   height: 600,
    //   width: 500,
    //   zIndex: 100,
    // };

    const resourceCardSpring = {
      stiffness: 300,
      damping: 24
    };

    const getCardContent = (styles = {}) => {
      return (
        <div className="resource-card__container">
          <div
            ref={(element) => this.rootElement = element}
            style={styles}
            className={`resource-card${this.props.selected ? ' resource-card--selected' : ""}`}
            onClick={this.handleClick}>
            <div className="resource-card__icon"></div>
            <div className="resource-card__title">{this.props.title}</div>
            <div className="resource-card__description">
              {this.props.description}
            </div>
            <div className="resource-card__description">
              {!this.props.length ? null : (<span>{this.props.length}</span>)}
              {!this.props.cost ? null : (<span> • {this.props.cost}</span>)}
            </div>
            <div className="resource-card__footer">
              <div className="resource-card__button">Start course</div>
            </div>
          </div>
          { this.props.isZoomed && <div className="resource-card__overlay" onClick={this.handleOverlayClick}></div> }
        </div>
      );
    }


    if (!this.state.shouldAnimate) {

      // (1) Not Zoomed
      if (!this.props.isZoomed) {
        return getCardContent();

      // (2) Zoomed
      } else {
        return getCardContent(resourceCardOpenStyle);
      }
    } else {

      // (3) Zooming in
      if (this.props.isZoomed) {
        const defaultCardMotionStyles = {
          height: this.rootElementBoundingRect.height,
          width: this.rootElementBoundingRect.width,
          left: this.rootElementBoundingRect.left,
          top: this.rootElementBoundingRect.top,
        };

        let cardSprings = {
          height: spring(resourceCardOpenStyle.height, resourceCardSpring),
          width: spring(resourceCardOpenStyle.width, resourceCardSpring),
          left: spring(resourceCardOpenStyle.left, resourceCardSpring),
          top: spring(resourceCardOpenStyle.top, resourceCardSpring),
        };

        return (
          <Motion defaultStyle={defaultCardMotionStyles} style={cardSprings} onRest={this.handleAnimationEnd}>
            {(interpolatingStyles) => {
              return getCardContent({...resourceCardOpenStyle, ...interpolatingStyles})
            }}
          </Motion>
        );

      // (4) Zooming out
      } else {
        const defaultCardMotionStyles = {
          height: resourceCardOpenStyle.height,
          width: resourceCardOpenStyle.width,
          left: resourceCardOpenStyle.left,
          top: resourceCardOpenStyle.top,
        };

        let cardSprings = {
          height: spring(this.rootElementParentBoundingRect.height, resourceCardSpring),
          width: spring(this.rootElementParentBoundingRect.width, resourceCardSpring),
          left: spring(this.rootElementParentBoundingRect.left, resourceCardSpring),
          top: spring(this.rootElementParentBoundingRect.top, resourceCardSpring),
        };

        return (
          <Motion defaultStyle={defaultCardMotionStyles} style={cardSprings} onRest={this.handleAnimationEnd}>
            {(interpolatingStyles) => {
              return getCardContent({...resourceCardOpenStyle, ...interpolatingStyles})
            }}
          </Motion>
        )
      }
    }

  }
}


export default ResourceCard;





// https://github.com/nashvail/ReactPathMenu/blob/staggered-motion/Components/APP.js


<StaggeredMotion
	defaultStyles={targetButtonStylesInit}
	styles={calculateStylesForNextFrame}>
	{interpolatedStyles =>
		<div>
			{interpolatedStyles.map(({height, left, rotate, scale, top, width}, index) =>
				<div
					className="child-button"
					key={index}
					style={{
						left,
						height,
						top,
						transform: `rotate(${rotate}deg) scale(${scale})`,
						width
					}}
				>
					<i className={"fa fa-" + childButtonIcons[index] + " fa-lg"}></i>
				</div>
			)}
		</div>
	}
</StaggeredMotion>
