import React, {Component} from 'react';
import StateLessForm from "@Components/Forms/StateLessForm"
import { rules, fieldMap } from "./formConfig"
import CardForUser from "../../components/CardForUser";

class Employees extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
      }
    }
  }
  submitForm = async ({ login, password }) => {
    console.log(login, password)
  }

  addEmployees = () => {

  }

  handleInput = (payload) => { this.setState(({ value }) => ({ value: { ...value, ...payload } })) }
  render() {
    const { state: { value } } = this
    return (
      <div className="">
        <div className="flex justify-between">
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
        <CardForUser></CardForUser>
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
