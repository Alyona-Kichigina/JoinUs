import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import ScrollBar from "@Components/ScrollBar"
import memoizeOne from "memoize-one"
import PureDeleteItems from "@Utils/Arrays/PureDeleteItems"
import StopPreventFunction from "@Utils/Events/StopPreventFunction"
import WithCloseWindow from "@Core/RenderProps/withCloseWindow"
import debounce from "@Utils/debounce"
// import WithScrollContainerRef from "@/Core/Decorators/WithScrollContainerRef"
import RenderOverlayMenu from "@Components/OverlayMenu/RenderOverlayMenu"
import Option from "./Option"
import MultipleOption from "./MultipleOption"
import {
  SelectContainer, InputSelectContainer, SelectInput, MultipleValuePrerenderContainer, NoOptionsLabel, ToggleIconContainer,
  RemoveIconContainer, SelectedOptionsScrollBar, SelectedOptions, MultipleValueInputContainer, OverlayItemsContainer
} from "./styles"
import IconToggleIndicator from "../../Icon/IconToggleIndicator"
import IconClose from "../../Icon/IconClose"

const scrollOptions = { wheelPropagation: false }

class Select extends PureComponent {
  callRemoteMethod = (debounce((v) => {
    const { remoteMethod, remote } = this.props
    if (remote) {
      remoteMethod(v)
    }
  }, 250))

  constructor(props) {
    super(props)
    this.searchInputRef = React.createRef()
    this.scrollBarRef = React.createRef()
    this.refSelectOverlayItems = React.createRef()
    this.refMultipleValueContainer = React.createRef()
    this.state = {
      open: false,
      typeAheadPointer: 0,
      filteredOptions: [],
      overflowMultipleItems: 0,
      multipleContainerMeta: {},
      // eslint-disable-next-line react/no-unused-state
      optionsPipe: this.createOptionsPipe(),
      search: "",
      multipleData: []
    }
  }

  static getDerivedStateFromProps({ options, value }, { search, optionsPipe, filteredOptions }) {
    const nextFilteredOptions = optionsPipe(options, search, value)
    if (filteredOptions !== nextFilteredOptions) {
      return {
        filteredOptions: nextFilteredOptions
      }
    }
    return null
  }

  componentDidMount() {
    const { props: { inputRef, id }, searchInputRef: { current: searchInputRef } } = this
    inputRef(id, searchInputRef)
  }

  componentDidUpdate(prevProps) {
    const {
      props: { filterable, remote, multiple, allowCreate },
      refSelectOverlayItems,
      refMultipleValueContainer: { current: refMultipleValueContainer }
    } = this
    if (filterable !== prevProps.filterable || remote !== prevProps.remote || multiple !== prevProps.multiple
      || allowCreate !== prevProps.allowCreate) {
      // eslint-disable-next-line react/no-did-update-set-state,react/no-unused-state
      this.setState({ optionsPipe: this.createOptionsPipe() })
    }
    if (multiple) {
      const { state: { multipleContainerMeta: { clearButtonWidth }, overflowMultipleItems } } = this
      const nextClearButtonWidth = (refSelectOverlayItems?.current?.clientWidth || 0)
      if (nextClearButtonWidth !== clearButtonWidth) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          multipleContainerMeta: {
            clearButtonWidth: nextClearButtonWidth,
            multipleContainerStyles: { right: `${nextClearButtonWidth}px` } }
        })
      } else if (refMultipleValueContainer) {
        const { children, clientHeight } = refMultipleValueContainer
        let OverflowItemCount = children.length
        for (const child of children) {
          if (child.offsetTop < clientHeight) {
            OverflowItemCount--
          } else {
            break
          }
        }
        if (overflowMultipleItems !== OverflowItemCount) {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({ overflowMultipleItems: OverflowItemCount })
        }
      }
    }
  }

  componentWillUnmount() {
    const { props: { inputRef, id } } = this
    inputRef(id)
  }

  getPlaceholder = memoizeOne((allWaysExpandedMultipleSelection, multiple, open, placeholder, value) => multiple
    ? value && value.length > 0
      ? open ? placeholder : ""
      : placeholder
    : open ? value ? this.getLabel(value) : placeholder : placeholder)

  createOptionsPipe = () => {
    const { props: { filterable, remote, multiple, allowCreate } } = this
    const optionsPipe = []
    if (filterable && !remote) {
      optionsPipe.push(this.filterOptions)
    }
    // if (multiple) {
    //   optionsPipe.push(this.removeSelectedMultipleOptions)
    // }
    if (allowCreate) {
      optionsPipe.push(this.addCreateOption)
    }
    return memoizeOne((options, search, value) => optionsPipe.reduce((acc, f) => f(acc), { options, search, value }).options)
  }

  focus = () => {
    setImmediate(() => {
      this.searchInputRef.current.focus()
    })
  }

  input = (value) => {
    this.handleSearchInput({ target: { value } })
  }

  filterOptions = ({ options, search, ...obj }) => {
    const { props: { filterBy, labelKey } } = this
    return {
      options: options.filter(option => filterBy(
        option,
        typeof option[labelKey] !== "string" ? option[labelKey].toString() : option[labelKey],
        search
      )),
      search,
      ...obj
    }
  }

  removeSelectedMultipleOptions = ({ options, value = [], ...obj }) => {
    const { props: { valueKey } } = this
    return {
      options: options.filter(option => value.every(
        value => option[valueKey] !== (typeof value === "object" ? value[valueKey] : value)
      )),
      ...obj
    }
  }

  addCreateOption = ({ options, search }) => {
    const { props: { labelKey, valueKey, ...obj } } = this
    return {
      options: search
        ? [{ [labelKey]: `Добавить ${search}`, [valueKey]: search }, ...options]
        : options,
      search,
      ...obj
    }
  }

  closeSelect = () => {
    const { props: { onBlur } } = this
    onBlur()
    this.setState({ open: false })
  }

  openSelect = () => {
    const { props: { onFocus, disabled, remote }, state: { open, search } } = this
    if (!open && !disabled) {
      this.setState({ open: true })
      onFocus()
      if (remote) {
        this.callRemoteMethod(search)
      }
    }
  }

  handleSearchInput = ({ target: { value } }) => {
    this.setState({ search: value })
    this.callRemoteMethod(value)
  }

  onSearchKeyDown = (e) => {
    switch (e.key) {
      case "Esc":
        this.closeSelect()
        break
      case "ArrowUp":
        e.preventDefault()
        this.typeAheadUp()
        break
      case "ArrowDown":
        e.preventDefault()
        this.typeAheadDown()
        break
      case "Enter":
        e.preventDefault()
        if (this.typeAheadSelect()) {
          e.stopPropagation()
        }
        break
      case "Tab":
        e.preventDefault()
        e.stopPropagation()
        if (this.selectOnTab) {
          this.typeAheadSelect()
        }
        break
      default:
        break
    }
  }

  getLabel = (value) => {
    const { props: { valueKey, labelKey, options } } = this
    const normalizedValue = value !== undefined && value !== null
      ? typeof value === "object"
        ? value[labelKey] || value[valueKey]
        : value
      : ""
    const opt = options.find(opt => opt[valueKey] === normalizedValue)
    return opt ? opt[labelKey] : normalizedValue || ""
  }

  selectOption = (optionValue, selected, index) => {
    const { props: { returnOption, valueKey, multiple, value = [] } } = this
    const normalizeValue = returnOption ? optionValue : optionValue[valueKey]
    if (multiple) {
      this.handleSelect(!selected?[...value, normalizeValue]: PureDeleteItems(value, index))
    } else {
      this.handleSelect(normalizeValue)
      this.closeSelect()
    }
  }

  deSelectOption = (index) => {
    const { value } = this.props
    this.handleSelect(PureDeleteItems(value, index))
  }

  clearSelection = (e) => {
    const { multiple } = this.props
    StopPreventFunction(e)
    this.handleSelect(multiple ? [] : null)
  }

  handleSelect = (value) => {
    const { id, onInput } = this.props
    onInput(value, id)
  }

  handleUpdateTypePointer = (index) => {
    this.setState({ typeAheadPointer: index })
  }

  typeAheadUp() {
    const { state: { typeAheadPointer, filteredOptions }, scrollBarRef: { current: { _container } } } = this
    if (typeAheadPointer > 0) {
      const nextPointer = typeAheadPointer - 1
      this.setState({ typeAheadPointer: nextPointer })
      if (nextPointer > 1 && nextPointer < filteredOptions.length - 3) {
        this.scrollTo(-_container.children[nextPointer].scrollHeight)
      }
    }
  }

  typeAheadDown() {
    const { state: { typeAheadPointer, filteredOptions }, scrollBarRef: { current: { _container } } } = this
    if (typeAheadPointer < filteredOptions.length - 1) {
      const nextPointer = typeAheadPointer + 1
      this.setState({ typeAheadPointer: nextPointer })
      if (nextPointer > 3 && nextPointer < filteredOptions.length) {
        this.scrollTo(_container.children[nextPointer].scrollHeight)
      }
    }
  }

  typeAheadSelect() {
    const { state: { filteredOptions, typeAheadPointer } } = this
    if (filteredOptions.length > 0) {
      this.selectOption(filteredOptions[typeAheadPointer])
      return true
    }
    return false
  }

  scrollTo(position) {
    if (this.scrollBarRef.current) {
      const { scrollBarRef: { current: { _container } } } = this
      _container.scrollTop += position
    }
  }

  renderMultipleOptions = () => {
    const { value = [], valueKey, disabled } = this.props
    let i = 0
    const renderCount = value.length
    const res = []
    for (i; i < renderCount; i++) {
      const option = value[i]
      res.push(
        <MultipleOption
          key={typeof option === "object" ? option[valueKey] : option}
          value={option}
          index={i}
          disabled={disabled}
          getLabel={this.getLabel}
          onDeselectOption={this.deSelectOption}
        />
      )
    }
    return res
  }

  render() {
    const {
      searchInputRef, scrollBarRef, refSelectOverlayItems, refMultipleValueContainer,
      props: {
        children, disabled, searchable, id, multiple, allWaysExpandedMultipleSelection, tipMaxSize, tipMinSize,
        value, labelKey, valueKey, returnOption, clearable, placeholder,
        remote, loading, awaitOfUserInputLabel, className, showToggleButton,
        ComponentOption
      },
      state: {
        open, search, filteredOptions, typeAheadPointer, multipleContainerMeta: { multipleContainerStyles },
        overflowMultipleItems, multipleData
      }
    } = this

    return (
      <RenderOverlayMenu
        onOpenOverlayMenu={this.openSelect}
        renderOverlayMenu={open}
      >
        {(overlayBoundRef, onOpenOverlayMenu, OverlayMenu) => {
          return (
            <WithCloseWindow closeWindow={this.closeSelect} byKey={open}>
              {(onMouseDown) => (
                <SelectContainer
                  ref={overlayBoundRef}
                  onMouseDown={onMouseDown}
                  className={className}
                >
                  <InputSelectContainer
                    className="relative w-full overflow-hidden flex-auto flex"
                    allWaysExpandedMultipleSelection={allWaysExpandedMultipleSelection}
                    disabled={disabled}
                  >
                    <div className="flex items-center relative w-full">
                      <SelectInput
                        ref={searchInputRef}
                        id={id}
                        type="text"
                        autoComplete="off"
                        disabled={disabled}
                        placeholder={this.getPlaceholder(allWaysExpandedMultipleSelection, multiple, open, placeholder, value)}
                        readOnly={!searchable}
                        value={open ? "" :  multiple ? "" : this.getLabel(value)}
                        onInput={this.handleSearchInput}
                        onKeyDown={this.onSearchKeyDown}
                        onFocus={onOpenOverlayMenu}
                      />
                      {multiple && value && value.length > 0 && (
                        value.map(({SYS_NAME, icon, ID}) => (
                          <div className="flex items-center m-r-8" key={ID}>
                            <img src={icon} alt="" className="p-r-8"/>
                            <div
                              className="p-r-15 fz14"
                            >
                              { SYS_NAME },
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {clearable && !(Array.isArray(value) ? value.length === 0 : !value) && !disabled && (
                      <RemoveIconContainer
                        type="button"
                        disabled={disabled}
                        title="Delete"
                        onMouseDown={this.clearSelection}
                      >
                        <IconClose />
                      </RemoveIconContainer>
                    )}
                    {showToggleButton && (
                      <ToggleIconContainer
                        onMouseDown={open ? this.closeSelect : null}
                        type="button"
                      >
                        <IconToggleIndicator className={open ? "up" : "down"} />
                      </ToggleIconContainer>
                    )}
                    {children}
                  </InputSelectContainer>
                  <OverlayMenu
                    className="no-user-select"
                    renderTip={false}
                    containerMargin="2px"
                    maxSize={tipMaxSize}
                    minSize={tipMinSize}
                  >
                    {(filteredOptions.length > 0) && !disabled && (
                      <SelectedOptions className="flex flex-col">
                        <ScrollBar
                          className="h-full"
                          ref={scrollBarRef}
                          options={scrollOptions}
                        >
                          {filteredOptions.map((option, index) => (
                            <ComponentOption
                              key={option[valueKey]}
                              option={option}
                              selectedOptions={value}
                              index={index}
                              labelKey={labelKey}
                              valueKey={valueKey}
                              multiple={multiple}
                              returnOption={returnOption}
                              typeAheadPointer={typeAheadPointer}
                              onSelect={this.selectOption}
                              onUpdateTypePointer={this.handleUpdateTypePointer}
                            />
                          ))}
                        </ScrollBar>
                      </SelectedOptions>
                    )}
                    {filteredOptions.length === 0 && (
                      <NoOptionsLabel className="color-darken-blue p-5">
                        {remote ? loading ? "Загружается..." : "Ничего не найдено" : "Нет данных"}
                      </NoOptionsLabel>
                    )}
                  </OverlayMenu>
                </SelectContainer>
              )}
            </WithCloseWindow>
          )
        }}
      </RenderOverlayMenu>
    )
  }
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  onInput: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  showToggleButton: PropTypes.bool,
  returnOption: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array]),
  options: PropTypes.array,
  disabled: PropTypes.bool,
  allWaysExpandedMultipleSelection: PropTypes.bool,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  multiple: PropTypes.bool,
  remote: PropTypes.bool,
  allowCreate: PropTypes.bool,
  filterable: PropTypes.bool,
  selectOnTab: PropTypes.bool,
  valueKey: PropTypes.string,
  placeholder: PropTypes.string,
  labelKey: PropTypes.string,
  awaitOfUserInputLabel: PropTypes.string,
  tipMinSize: PropTypes.string,
  className: PropTypes.string,
  tipMaxSize: PropTypes.string,
  remoteMethod: PropTypes.func,
  filterBy: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  inputRef: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  ComponentOption: PropTypes.func,
}

Select.defaultProps = {
  showToggleButton: true,
  clearable: true,
  searchable: true,
  filterable: true,
  tipMinSize: "100%",
  tipMaxSize: "100%",
  awaitOfUserInputLabel: "Enter your request",
  valueKey: "ID",
  labelKey: "SYS_NAME",
  options: [],
  onBlur: () => null,
  onFocus: () => null,
  inputRef: () => null,
  filterBy: (option, label, search) => label ? label.toLowerCase().indexOf(search.toLowerCase()) > -1 : false,
  className: "",
  ComponentOption: Option
}

export default Select
