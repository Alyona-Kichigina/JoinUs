import React, {Component} from 'react';
import StateLessForm from "@Components/Forms/StateLessForm"
import { rules, fieldMap } from "./formConfig"

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

  handleInput = (payload) => { this.setState(({ value }) => ({ value: { ...value, ...payload } })) }
  render() {
    const { state: { value } } = this
    return (
      <div className="bg-white">
        em
        <StateLessForm
          fields={fieldMap}
          rules={rules}
          value={value}
          onInput={this.handleInput}
          onSubmit={this.submitForm}
        >
          <button
            className="blue btn width-medium"
            name="Login"
            type="submit"
          >
            Сохранить
          </button>
        </StateLessForm>
      </div>
    );
  }
};

export default Employees;
