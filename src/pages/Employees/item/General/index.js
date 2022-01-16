import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {fieldMap, rules} from "./formConfig";
import Form from "@Components/Forms/index"
import {FormContainer, TabContainer} from "../style";
import ScrollBar from "@Components/ScrollBar"
import {WithValidationHocRenderPropAdapter} from "../../../../Validator";
import memoizeOne from "memoize-one";
import axios from "axios";
import {CANDIDATE_LIST, DEFAULT_URL} from "../../../../components/APIList";
import {RELEASE_DATE_FORMAT, CREATE_DATE_FORMAT} from "@constants"
import EditDateForSave from "../../../../utils/Date/EditDateForSave";

const withSetDisabledFieldsConfigAndSplitByColumns = memoizeOne((config, readOnlyFields = []) => readOnlyFields
.reduce((acc, c) => {
  const index = acc.findIndex(({ id }) => id === c)
  if (index >= 0) {
    acc[index] = { ...acc[index], disabled: true }
  }
  return acc
}, [...config])
.reduce((acc, f) => {
  const { formColumn = 0 } = f
  acc[formColumn].push(f)
  return acc
}, [[], []]))

class General extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }
  inputDataOfEmployee = (value) => {
    this.setState(({ data }) => ({ data: { ...data, ...value } }))
  }
  saveDataOfEmployee = (payload) => {
    axios.post(`${DEFAULT_URL}/${CANDIDATE_LIST}`, {
      ...payload,
      program: [payload.program],
      release_date: EditDateForSave(payload.release_date, RELEASE_DATE_FORMAT),
      create_date: EditDateForSave(payload.create_date, CREATE_DATE_FORMAT)
    })
    .then((response) => {console.log(response)},
      (error) => {
        this.setState({error})
      }
    )
  }
  render() {
    const { data } = this.state
    const [firstForm, SecondForm] = withSetDisabledFieldsConfigAndSplitByColumns(fieldMap)
    return (
      <div className="flex-container hidden">
        <WithValidationHocRenderPropAdapter
          onInput={this.inputDataOfEmployee}
          onSubmit={this.saveDataOfEmployee}
          value={data}
          rules={rules}
        >
          {(formProps) => {
            const { formValid, onSubmit, onInput } = formProps
            return (
              <>
                <ScrollBar>
                  <TabContainer className="flex-container">
                    <FormContainer>
                      <Form
                        {...formProps}
                        fields={firstForm}
                        value={data}
                        onInput={onInput}
                      />
                      <Form
                        {...formProps}
                        fields={SecondForm}
                        value={data}
                        onInput={onInput}
                      />
                    </FormContainer>
                  </TabContainer>
                </ScrollBar>

                <div className="flex justify-end m-r-24 m-t-24">
                  <button
                    name="cancel"
                    type="submit"
                    className="grey btn width-medium m-r-16"
                  >
                    Отмена
                  </button>
                  <button
                    name="save"
                    type="submit"
                    className="blue btn width-medium"
                    onClick={onSubmit}
                  >
                    Сохранить
                  </button>
                </div>
              </>
            )
          }}
        </WithValidationHocRenderPropAdapter>
      </div>
    );
  }
}

General.propTypes = {};

export default General;
