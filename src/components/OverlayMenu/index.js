/* eslint-disable react/no-did-update-set-state */
import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import memoizeOne from "memoize-one"
import { SlotContainer, FixedContainer, Tip } from "./styles"

class OverlayMenu extends PureComponent {
  margeStyles = memoizeOne((containerSizeStyles, wrapperStyles) => ({ ...containerSizeStyles, ...wrapperStyles }))

  constructor(props) {
    super(props)
    this.observer = new ResizeObserver(this.resolveDimensions)
    this.refOverlayContainer = React.createRef()
    this.contentRef = React.createRef()
    this.state = {
      positionStyles: {},
      containerSizeStyles: {},
    }
  }

  componentDidMount() {
    const { event: { target }, refTargetParent = target, refContainer } = this.props
    this.observer.observe(refTargetParent, {})
    refContainer.addEventListener("scroll", this.resolveDimensions)
  }

  componentDidUpdate(prevProps, prevState) {
    const { state: { containerSizeStyles }, props: { event } } = this
    if (containerSizeStyles !== prevState.containerSizeStyles) {
      const {
        refOverlayContainer,
        props: { event, event: { target }, refContainer, refTargetParent = target, containerMargin, sticky, reversDefault }
      } = this
      const { right, left, top } = refTargetParent.getBoundingClientRect()
      const { bottom: pointerBottom } = target.getBoundingClientRect()
      const { pageX = right } = event
      const { clientWidth } = refContainer
      const { left: zoneLeft, top: zoneTop, bottom: zoneBot, right: zoneRight } = refContainer.getBoundingClientRect()
      // ширина контекстного меню
      const { clientWidth: contextMenuWidth, clientHeight: contextMenuHeight } = refOverlayContainer.current
      // влазит ли снизу
      const outOfYAxis = window.innerHeight - pointerBottom - contextMenuHeight
      // влазит ли справа меню
      const outOfXAxis = zoneRight - left - contextMenuWidth
      const YPositions = outOfYAxis < 0
        ? { bottom: `calc(${containerMargin} + ${window.innerHeight - top}px)` }
        : { top: `calc(${containerMargin} + ${pointerBottom}px)` }
      let rightPosition = zoneRight - right
      rightPosition = rightPosition > 0 ? rightPosition : 0
      const leftPosition = clientWidth - (left - zoneLeft) > contextMenuWidth ? left : zoneLeft
      const maxTipLeftPosition = leftPosition + contextMenuWidth - 8
      this.setState({
        positionStyles: (
          (outOfYAxis < 0 ? top < zoneBot : top > zoneTop)
          || (refContainer !== document.body && (outOfXAxis < 0 || zoneLeft > leftPosition))
        ) ? {
            wrapperStyles: {
              ...sticky ? { boxShadow: "rgba(0, 0, 0, 0.125) 1px 6px 11px" } : {},
              ...YPositions,
              ...reversDefault || outOfXAxis < 0 // отрисовка справа на лево
                ? {
                  right: `${window.innerWidth - zoneRight}px`,
                  // если в лево окно слишком большое вписываем его в ширину окна
                  ...zoneRight - rightPosition - contextMenuWidth < 0 ? { width: "auto", left: 0 } : {}
                }
                : { left: `${leftPosition}px` }
            },
            containerStyles: sticky
              ? {
                borderTopRightRadius: "4px",
                borderBottomLeftRadius: "4px",
                borderBottomRightRadius: "4px"
              }
              : {},
            tipStyles: {
              ...YPositions,
              ...outOfYAxis < 0
                ? { transform: "rotate(45deg) translateX(50%) translateZ(-1px)" }
                : { transform: "rotate(45deg) translateX(-50%) translateZ(-1px)" },
              ...reversDefault || outOfXAxis < 0
                ? { right: `${window.innerWidth - zoneRight + 7}px` }
                : { left: `${leftPosition - 7 < pageX
                  ? maxTipLeftPosition > pageX
                    ? pageX - 7 > leftPosition ? pageX : pageX + 7
                    : maxTipLeftPosition
                  : pageX - 7}px`
                }
            }
          } : { wrapperStyles: { display: "none" } }
      })
    } else if (event !== prevProps.event) {
      const { event: { target }, refTargetParent = target, refContainer } = this.props
      this.observer.disconnect()
      this.observer.observe(refTargetParent, {})
      prevProps.refContainer.removeEventListener("scroll", this.resolveDimensions)
      refContainer.addEventListener("scroll", this.resolveDimensions)
    }
  }

  componentWillUnmount() {
    const { refContainer } = this.props
    this.observer.disconnect()
    refContainer.removeEventListener("scroll", this.resolveDimensions)
  }

  resolveDimensions = () => {
    const {
      refOverlayContainer: { current: refOverlayContainer },
      props: { maxSize, minSize, event: { target }, refTargetParent: { clientWidth } = target }
    } = this
    this.setState({
      containerSizeStyles: {
        maxWidth: `${maxSize.indexOf("%") >= 0 ? (clientWidth * parseInt(maxSize, 10)) / 100 : maxSize}px`,
        minWidth: isNaN(Number(minSize))
          ? maxSize.indexOf("%") >= 0
            ? (clientWidth * parseInt(maxSize, 10)) / 100
            : `${maxSize}px`
          : `${minSize}px`,
        width: refOverlayContainer.clientWidth > clientWidth ? "auto" : `${clientWidth}px`,
      }
    })
  }

  render() {
    const {
      refOverlayContainer, contentRef,
      state: { containerSizeStyles, positionStyles: { wrapperStyles, tipStyles, containerStyles } },
      props: { renderTip, children, positionStatic, className, onClick, onMouseDown, onMouseUp }
    } = this

    return (
      <FixedContainer
        ref={refOverlayContainer}
        positionStatic={positionStatic}
        style={this.margeStyles(containerSizeStyles, wrapperStyles)}
      >
        {renderTip && <Tip style={tipStyles} /> }
        <SlotContainer
          className={className}
          ref={contentRef}
          style={containerStyles}
          onClick={onClick}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          {children}
        </SlotContainer>
      </FixedContainer>
    )
  }
}

OverlayMenu.propTypes = {
  renderTip: PropTypes.bool,
  sticky: PropTypes.bool,
  containerMargin: PropTypes.string,
  reversDefault: PropTypes.bool,
  minSize: PropTypes.string,
  maxSize: PropTypes.string,
  event: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Event)]),
  positionStatic: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  refTargetParent: PropTypes.instanceOf(Element),
  refContainer: PropTypes.instanceOf(Element).isRequired
}

OverlayMenu.defaultProps = {
  renderTip: true,
  containerMargin: "15px",
  minSize: "150",
  className: "",
  maxSize: "350",
  event: {},
}

export default OverlayMenu
