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
  componentDidUpdate() {
    console.log("componentDidUpdate")
  }
  inputDataOfEmployee = (value) => {
    this.setState(({ data }) => ({ data: { ...data, ...value } }))
  }
  saveDataOfEmployee = (payload) => {
    const { location: { pathname }, history: { push } } = this.props
    const pathnames = pathname.split("/").filter(x => x)
    const newEmploy = pathnames[1] === "new_employ"
    const idEmploy = newEmploy ? "" : `${pathnames[1]}/`
    axios[newEmploy ? "post" : "put"](`${DEFAULT_URL}/${CANDIDATE_LIST}/${idEmploy}`,
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
    .then((response) => {},
      (error) => {
        this.setState({error})
      }
    )
  }
  render() {
    const { state: { data }, props: { goBack } }= this
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
                    onClick={() => goBack()}
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
