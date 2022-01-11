import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from "prop-types"
import equal from "lodash/isEqual"
import { useWatch } from "@Utils/hooks/useWatch"
import unwrapQueryObject from "@Utils/unwrapQueryObject"

// reference, refParams не нужен
// убрать

const WithRefLoaderHoc = (Component) => {
  const WithRefLoader =({
    reference, paramsMap, refParams, refLoader, disabled, formPayload, preload, getValue,
    ...props
  }) => {
    const { multiple, valueKey, value } = props
    const [options, setOptions] = useState([])
    const [prevRefParams, setPrevRefParams] = useState({})
    const [loading, setLoadingState] = useState(false)
    const unwrapParam = useCallback((param) => (typeof param === "object" ? param[valueKey] : param), [valueKey])

    const findPreviousValue = useCallback((options, value) => {
      const nVal = typeof value === "object" ? value[valueKey] : value
      return options.find(({ [valueKey]: optVal }) => optVal === nVal)
    }, [valueKey])

    const dynamicParams = useMemo(() => paramsMap.reduce((acc, [valKey, refKey]) => {
      const val = getValue(valKey, formPayload)
      // параметры нужны для зависимых справочников, если какой-то параметр не введен, значит не нужно загружать справочник
      if (val !== undefined && val !== null) {
        acc[refKey] = Array.isArray(val) ? val.map(v => unwrapParam(v)) : unwrapParam(val)
      }
      return acc
    }, {}), [formPayload, getValue, paramsMap, unwrapParam])

    const isAllDynamicParamsProvided = useMemo(() => {
      const params = Object.values(dynamicParams)
      return paramsMap.length === 0 || (params.length === paramsMap.length && params.reduce((acc, i) => {
        if (Array.isArray(i) ? i.length === 0 : !i) {
          return false
        }
        return acc
      }, true))
    }, [dynamicParams, paramsMap.length])

    const loadRef = async (v_find) => {
      try {
        const requestParams = {
          v_find,
          ...refParams,
          ...dynamicParams,
        }
        if (isAllDynamicParamsProvided) {
          if (!equal(requestParams, prevRefParams)) {
            setLoadingState(true)
            const nextOptions = await refLoader({ reference, params: unwrapQueryObject(requestParams) }, valueKey)
            // находим опции для текущих значений либо в старом запросе, либо в новом
            if (value) {
              if (multiple) {
                value.forEach(val => {
                  // ищем в новых опциях значение, если не находим то ищем в старых и закидываем в новые
                  if (!findPreviousValue(nextOptions, val)) {
                    const o = findPreviousValue(options, val)
                    if (o) {
                      nextOptions.push(o)
                    }
                  }
                })
                // ищем в новых опциях значение, если не находим то ищем в старых и закидываем в новые
              } else if (!findPreviousValue(nextOptions, value)) {
                const o = findPreviousValue(options, value)
                if (o) {
                  nextOptions.push(o)
                }
              }
            }
            setOptions(nextOptions)
            setPrevRefParams(refParams)
          }
        } else {
          setOptions([])
        }
      } catch (e) {
        console.log(e)
        setOptions([])
      } finally {
        setLoadingState(false)
      }
    }

    useWatch(dynamicParams, (val, prevVal) => {
      if (prevVal && !equal(val, prevVal)) {
        loadRef()
      }
    })

    useEffect(() => {
      if (isAllDynamicParamsProvided && (!props.returnOption && value)) {
        loadRef()
      }
    }, [])

    return (
      <Component
        {...props}
        options={options}
        loading={loading}
        formPayload={formPayload}
        refParams={refParams}
        remoteMethod={loadRef}
        disabled={disabled || !isAllDynamicParamsProvided}
        remote={!!(reference || refLoader)}
      />
    );
  }
  WithRefLoader.propTypes = {
    multiple: PropTypes.bool,
    preload: PropTypes.bool,
    returnOption: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string, PropTypes.number]),
    reference: PropTypes.string,
    disabled: PropTypes.bool,
    paramsMap: PropTypes.array,
    formPayload: PropTypes.object,
    refParams: PropTypes.object,
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    refLoader: PropTypes.func,
    getValue: PropTypes.func,
  }

  WithRefLoader.defaultProps = {
    valueKey: "ID",
    labelKey: "SYS_NAME",
    paramsMap: [],
    formPayload: {},
    refParams: {},
    // refLoader: getRef,
    getValue: (valKey, formPayload) => {
      const { [valKey]: val } = formPayload
      return val
    }
  }
  return WithRefLoader
};

export default WithRefLoaderHoc;
