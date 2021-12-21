import React, {Component} from 'react';
import PageHeader from "../../../components/PageHeader";
import {EMPLOYEES_TAB} from "./Constants";
import Form from "@Components/Forms/index"
import {fieldMap} from "./formConfig";
import {FormContainer, TabContainer} from "./style";
import memoizeOne from "memoize-one"

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
      data: {

      }
    }
  }
  inputDataOfEmployee = (v, id) => {
    console.log(v, id)
    this.setState({data: v})
  }
  saveDataOfEmployee = (v, id) => {
    console.log(v, id)

  }
  render() {
    const { data } = this.props
    const [firstForm, SecondForm] = withSetDisabledFieldsConfigAndSplitByColumns(fieldMap)
    return (
      <PageHeader
        {...this.props}
        url="employees"
        links={EMPLOYEES_TAB}
        pageData={pageData}
      >
        <TabContainer>
          <FormContainer>
            <Form
              fields={firstForm}
              value={data}
              onInput={this.inputDataOfEmployee}
              onChange={this.saveDataOfEmployee}
            />
            <Form
              fields={SecondForm}
              value={data}
              onInput={this.inputDataOfEmployee}
              onChange={this.saveDataOfEmployee}
            />
          </FormContainer>
          <div className="flex justify-end p-t-5 p-b-5 separator-top">
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
            >
              Сохранить
            </button>
          </div>
        </TabContainer>
      </PageHeader>
    );
  }
}

export default Employ;
