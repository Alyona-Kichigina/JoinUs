import React, {Component} from 'react';
import StateLessForm from "@Components/Forms/StateLessForm"
import { rules, fieldMap } from "./formConfig"
import FilterForEmployees from "./list/FilterForEmployees";
import CheckBox from "../../components/Fields/CheckBox";

const BACK_END_URL = "192.168.0.102:9000"

// employee

class Employees extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: false
    }
  }
  submitForm = async ({ login, password }) => {
    console.log(login, password)
  }

  addEmployees = async () => {
    await fetch('192.168.0.102:9000/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });
  }

  onInputCha = async (value) => {
    this.setState({ value: value })
  }

  handleInput = (payload) => { this.setState(({ value }) => ({ value: { ...value, ...payload } })) }
  render() {
    const { state: { value } } = this
    return (
      <div className="">
        <div className="flex justify-between p-b-25">
          <h1>Сотрудники</h1>
          <button
            className="blue btn width-m"
            name="addEmployees"
            type="submit"
            onClick={this.addEmployees}
          >
            + Создать сотрудника
          </button>
        </div>
        <FilterForEmployees/>
        <CheckBox label="Завершена" id="CheckBox" value={value} onInput={this.onInputCha}/>
        {/*<StateLessForm*/}
        {/*  fields={fieldMap}*/}
        {/*  rules={rules}*/}
        {/*  value={value}*/}
        {/*  onInput={this.handleInput}*/}
        {/*  onSubmit={this.submitForm}*/}
        {/*>*/}
        {/*  <button*/}
        {/*    className="blue btn width-medium"*/}
        {/*    name="Login"*/}
        {/*    type="submit"*/}
        {/*  >*/}
        {/*    Сохранить*/}
        {/*  </button>*/}
        {/*</StateLessForm>*/}
      </div>
    );
  }
};

export default Employees;
