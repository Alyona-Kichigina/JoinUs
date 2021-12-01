import React, { Component } from "react"
import PropTypes from "prop-types"
import memoizeOne from "memoize-one"
import { InputContainer } from "./styles"

class BsInput extends Component {
  margeStyles = memoizeOne((styleInputBox, styleInput) => ({ ...styleInputBox, ...styleInput }))

  constructor(props) {
    super(props)
    this.state = { height: "" }
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    const { props: { inputRef, id }, inputRef: { current: inputField } } = this
    inputRef(id, inputField)
  }

  componentDidUpdate(prevProps) {
    if (this.props.autosize) {
      const { value, minHeight, maxHeight } = this.props
      if (value !== prevProps.value || prevProps.minHeight !== minHeight || maxHeight !== prevProps.maxHeight) {
        this.resize()
      }
    }
  }

  componentWillUnmount() {
    const { props: { inputRef, id } } = this
    inputRef(id)
  }

  getComponentType = memoizeOne((type) => ({
    Input: type === "textarea" ? "textarea" : "input",
    InputType: type === "password" ? "password" : "text"
  }))

  getWidthLine = memoizeOne((maxlength = 0, value = "") => ({
    width: `${(value?.length / Number(maxlength)) * 100}%`
  }))

  handleKeyDown = (e) => {
    const { key, ctrlKey } = e
    if (key !== "Enter" && (this.props.type !== "textarea" || !ctrlKey)) {
      e.stopPropagation()
    }
  }

  focus = () => {
    this.inputRef.current.focus()
  }

  onInput = ({ target: { value, id } }) => {
    this.props.onInput(value, id)
  }

  resize() {
    setTimeout(() => {
      let contentHeight = this.inputRef.current.scrollHeight + 1
      if (this.props.minHeight) {
        contentHeight = contentHeight < this.props.minHeight ? this.props.minHeight : contentHeight
      }
      if (this.props.maxHeight) {
        if (contentHeight > this.props.maxHeight) {
          contentHeight = this.props.maxHeight
        }
      }
      this.setState({ height: `${contentHeight}px` })
    }, 10)
  }

  // todo я задавала maxHeight для обертки инпута, но с добавлением в Highlighter высоты, maxHeight задает неправильную высоту инпуту
  // надо протестировать что maxHeight точно не нужен обертке инпута
  render() {
    const {
      children, type, maxlength, value, id, inputStyles, styleInputBox, className, disabled, autoComplete, placeholder,
      onKeyUp, onBlur, onFocus, minHeight, name
    } = this.props
    const { height } = this.state
    const { Input, InputType } = this.getComponentType(type)
    return (
      <div
        className={`flex input-box ${className}`}
        style={this.margeStyles(styleInputBox, { minHeight, height })}
      >
        <InputContainer
          className="relative flex-full-with flex wrapper-input-control"
          type={InputType}
        >
          <Input
            id={id}
            ref={this.inputRef}
            type={InputType}
            value={value}
            maxLength={maxlength}
            className={`input-control ${disabled ? "disabled" : ""}`}
            style={this.margeStyles(inputStyles, { height: `${Input === "textarea" ? "auto" : "var(--height-input)"}` })}
            disabled={disabled}
            onKeyDown={this.handleKeyDown}
            autoComplete={autoComplete}
            placeholder={placeholder}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={this.onInput}
            onKeyUp={onKeyUp}
            name={name}
          />
        </InputContainer>
        {children}
      </div>
    )
  }
}

BsInput.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  maxlength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  autosize: PropTypes.bool,
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onKeyUp: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  inputStyles: PropTypes.object,
  styleInputBox: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  inputRef: PropTypes.func,
  autoComplete: PropTypes.string,
}

BsInput.defaultProps = {
  value: "",
  type: "input",
  autoComplete: "off",
  maxHeight: 350,
  placeholder: "",
  className: "",
  inputRef: () => null,
  styleInputBox: {},
}

export default BsInput
