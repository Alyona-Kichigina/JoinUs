import React, {Component} from 'react';
import PageHeader from "../../../components/PageHeader";
import {EMPLOYEES_TAB} from "./Constants";
import Form from "@Components/Forms/index"
import {fieldMap, rules} from "./formConfig";
import {FormContainer, TabContainer} from "./style";
import memoizeOne from "memoize-one"
import ScrollBar from "@Components/ScrollBar"
import {WithValidationHocRenderPropAdapter} from "../../../Validator";

const pageData = {
  pageName: "Новый сотрудник"
}

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

class Employ extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }
  inputDataOfEmployee = (value) => {
    this.setState(({ data }) => ({ data: { ...data, ...value } }))
  }
  saveDataOfEmployee = (v) => {
    console.log(v)

  }
  render() {
    const { data } = this.state
    const [firstForm, SecondForm] = withSetDisabledFieldsConfigAndSplitByColumns(fieldMap)
    return (
      <PageHeader
        {...this.props}
        url="employees"
        links={EMPLOYEES_TAB}
        pageData={pageData}
      >
        <div className="flex-container hidden p-b-24">
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
      </PageHeader>
    );
  }
}

export default Employ;
