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
import Avatar from "../../../../components/Avatar";

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
  componentDidMount() {
    const { location: { pathname } } = this.props
    const pathnames = pathname.split("/").filter(x => x)
    const idEmploy = pathnames[1] !== "new_employ" ? `${pathnames[1]}` : ""
    if (pathnames[1] !== "new_employ") {
      axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/${idEmploy}`)
      .then(
        (response) => {
          this.setState({
            isLoaded: true,
            data: response.data
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
    }
  }
  inputDataOfEmployee = (value) => {
    this.setState(({ data }) => ({ data: { ...data, ...value } }))
  }
  saveDataOfEmployee = async (payload) => {
    const { location: { pathname }, history: { push } } = this.props
    const pathnames = pathname.split("/").filter(x => x)
    const newEmploy = pathnames[1] === "new_employ"
    const idEmploy = newEmploy ? "" : `${pathnames[1]}/`
    // данные получаем по запросу и их сетоть в данные
    try {
      const result = await axios[newEmploy ? "post" : "put"](`${DEFAULT_URL}/${CANDIDATE_LIST}/${idEmploy}`,
        newEmploy
          ?
          {
          ...payload,
          program: [payload.program],
          release_date: payload.release_date,
          create_date: payload.create_date,
          id_customer: 1,
          id_employee: 1,
          status: 1,
          salary: Number(payload.salary)
        }
      :
        {
          ...payload,
          program: [payload.program],
          release_date: payload.release_date,
          create_date: payload.create_date,
          salary: Number(payload.salary)
        }
      )
      this.setState({data: result.data})
      if (newEmploy) {
        push("/employees")
      } else {
        // push(`/employees/${program_name}/${id}/general`)
      }
    } catch (err) {
      throw new Error(
        `Данные пользователя не добавлены или не редактированы.\n${err.message}`
      );
    }
  }

  render() {
    const { state: { data }, props: { history: { goBack } },  }= this
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
                <Avatar className="mt-6 ml-6"/>
                <ScrollBar>
                  <TabContainer className="flex-container">
                    <FormContainer className="m-b-24">
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
                    <div className="flex justify-end mt-auto p-b-24">
                      <button
                        name="cancel"
                        type="submit"
                        onClick={() => goBack()}
                        className="grey btn width-m m-r-16"
                      >
                        Отмена
                      </button>
                      <button
                        name="save"
                        type="submit"
                        className="blue btn width-m"
                        onClick={onSubmit}
                      >
                        Сохранить
                      </button>
                    </div>
                  </TabContainer>
                </ScrollBar>
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
