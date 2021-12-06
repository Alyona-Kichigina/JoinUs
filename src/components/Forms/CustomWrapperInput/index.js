import React, { Component } from "react"
import PropTypes from "prop-types"

const inputPattern = Symbol("pattern")
const handlers = Symbol("handlers")

export default ({ pattern, appendix, name, beforeNormalize, afterNormalize }) => (OriginalComponent) => {
  class CustomWrapperInput extends Component {
    constructor(props) {
      super(props)

      this.state = {
        [inputPattern]: new RegExp(pattern),
        [handlers]: {
          input: this.handleChange,
          ...(appendix
            ? {
              blur: this.handleBlur,
              focus: this.handleFocus
            }
            : {})
        }
      }
      this.inputRef = React.createRef()
    }

    onInput = (value) => {
      this.emitVal(
        value === ""
          ? appendix || ""
          : this.state[inputPattern].test(value)
            ? value.match(this.state[inputPattern])[0]
            : this.props.value || ""
      )
    }

    emitVal = (value) => {
      if (value !== this.props.value) {
        this.props.onInput(value, this.props.id)
      } else {
        const selection = this.inputRef.current.inputRef.current.selectionStart
        this.forceUpdate()
        setTimeout(() => {
          this.inputRef.current.inputRef.current.setSelectionRange(selection - 1, selection - 1)
        }, 10)
      }
    }

    handleFocus = appendix
      ? () => {
        if (!this.props.value) {
          this.emitVal(appendix)
        }
      }
      : () => this.props.onFocus()

    handleBlur = appendix
      ? () => {
        if (this.props.value.search(this.state[inputPattern]) > -1) {
          this.emitVal("")
        }
      }
      : () => this.props.onBlur()

    handleChange = beforeNormalize
      ? (v) => this.onInput(beforeNormalize(v))
      : (v) => this.onInput(v)

    render() {
      return (
        <OriginalComponent
          {...this.props}
          ref={this.inputRef}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onInput={this.handleChange}
        />
      )
    }
  }

  CustomWrapperInput.propTypes = {
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onInput: PropTypes.func,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }
  CustomWrapperInput.defaultProps = {
    onBlur: () => null,
    onFocus: () => null
  }
  return CustomWrapperInput
}
