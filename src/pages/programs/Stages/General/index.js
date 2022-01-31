import React, {Component} from 'react';
import memoizeOne from "memoize-one";
import Form from "@Components/Forms/index"
import PropTypes from "prop-types"
import ModalSidebar from "../../../../components/ModalSidebar";
import RadioButton from "../../../../components/RadioButton";
import {WithValidationHocRenderPropAdapter} from "../../../../Validator";
import {fieldMap, rules} from "./formConfig";
import {FormContainer} from "../../item/General/style"
import axios from "axios";
import { ADAPTATION_EMPLOYEE, ADAPTATION_LEVELS, ADAPTATION_PROGRAM, DEFAULT_URL } from "../../../../components/APIList";
import Avatar from "../../../../components/Avatar";
import { levelsBreadcrumbs } from "../../configs";
import ProgramsHeader from "../../ProgramsHeader"
import {LEVELS_LINKS, NEW_PROGRAM} from "../../Constants";

const withSetDisabledFieldsConfigAndSplitByColumns = memoizeOne((config, readOnlyFields = []) => readOnlyFields
  .reduce((acc, c) => {
    const index = acc.findIndex(({id}) => id === c)
    if (index >= 0) {
      acc[index] = {...acc[index], disabled: true}
    }
    return acc
  }, [...config])
  .reduce((acc, f) => {
    const {formColumn = 0} = f
    acc[formColumn].push(f)
    return acc
  }, [[], []]))

class LevelsGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientModal: false,
      creatorModal: false,
      programs: [],
      employees: [],
      data: {},
      modalState: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount() {
    const {location: {pathname}} = this.props
    const pathnames = pathname.split("/").filter(x => x)
    const idLevel = pathnames[1] !== "new_program" ? `/${pathnames[3]}` : ""
    axios.get(`${DEFAULT_URL}/${ADAPTATION_EMPLOYEE}`)
      .then(
        (response) => {
          this.setState({
            isLoaded: true,
            employees: response.data
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
    axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}`)
      .then(
        (response) => {
          this.setState({
            isLoaded: true,
            programs: response.data
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
    if (pathnames[1] !== "new_program" && pathnames[3] !== "level") {
      axios.get(`${DEFAULT_URL}/${ADAPTATION_LEVELS}${idLevel}`)
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

  handleInputChange(value, id) {
    this.setState({
      [id]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  selectClient = (value) => {
    const {customers} = this.state
    const customer = customers.find((a) => a.customer_name === value)
    this.setState({
      modalState: [customer.id]
    })
  }

  saveNewLevel() {
    const {location: {pathname}, history: {push}} = this.props
    const {data} = this.state
    const pathnames = pathname.split("/").filter(x => x)
    const newProgram = pathnames[1] === "New_level"
    const idLevel = newProgram ? "/" : `/${pathnames[3]}/`
    axios[newProgram ? "post" : "put"](`${DEFAULT_URL}/${ADAPTATION_LEVELS}${idLevel}`, {...data, illustration: "111"})
      .then(
        (response) => {
          const {data, data: {program_name, id}} = response
          this.setState({
            isLoaded: true,
            data: data
          })
          // push(`/programs/${program_name}/${id}/general`)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  inputDataOfProgram = (value) => {
    this.setState(({data}) => ({data: {...data, ...value}}))
  }
  saveDataOfStage = (v) => {
    console.log(v, 8989)
  }

  tierUp = () => {
    const {data: {tier}, data} = this.state
    this.setState({
      data: {...data, tier: tier ? tier + 1 : 1}
    })
  }
  tierDown = () => {
    const {data: {tier}, data} = this.state
    this.setState({
      data: {...data, tier: tier > 1 ? tier - 1 : tier}
    })
  }

    selectCreator = (value) => {
        const { employees } = this.state
        const employee = employees.find((a) => a.id === value)
        this.setState({
            modalState: employee.id
        })
    }
    selectedCreator = (value) => {
        const { employees, modalState } = this.state
        const newValue = employees.find((a) => a.id === value)
        return modalState ? modalState === newValue.id : false
    }
    pageHeaderTitle = (level_name) => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const newProgram = pathnames[1] === NEW_PROGRAM
        return newProgram ? "Новая программа" : level_name ? `Уровень "${level_name}"` : ""
    }
  render() {
    const {history: {goBack}} = this.props
    const {creatorModal, modalState, employees, data, data: {id_employee, level_name}} = this.state
    const {tierUp, tierDown, pageHeaderTitle} = this
    const toggleCreatorModal = () => {
      this.setState({creatorModal: !creatorModal})
    }
    const [firstForm, SecondForm] = withSetDisabledFieldsConfigAndSplitByColumns(fieldMap(toggleCreatorModal, id_employee, tierUp, tierDown, employees))
    return (
      <ProgramsHeader
          className="h-full"
          {...this.props}
          pageData={pageHeaderTitle(level_name)}
          bredCrumbsConfig={levelsBreadcrumbs}
          url="programs"
          links={LEVELS_LINKS}
      >
        <ModalSidebar
          title="Выбор создателя"
          closeModal={toggleCreatorModal}
          isOpen={creatorModal}
          handleSave={() => this.setState({
            data: {...data, id_employee: modalState},
            creatorModal: !creatorModal
          })}
        >
          <div
            className="mx-9"
          >
            <div
              className="grid mt-11 border-list pb-4 color-light-blue-2 fs-14 font-bold"
              style={{"grid-template-columns": "10% 90%"}}
            >
              <div>
                №
              </div>
              <div>
                Наименование
              </div>
            </div>
            {
                employees.map(({first_name, last_name, id}, index) => {
                    const creatorName = `${first_name} ${last_name}`
                return (
                  <div
                    className="grid py-4 font-semibold fs-14 border-list"
                    style={{"grid-template-columns": "10% 90%"}}
                  >
                    <div
                      className="flex items-center"
                    >
                      {index + 1}
                    </div>
                    <RadioButton
                      inputValue={() => this.selectCreator(id)}
                      selected={() => this.selectedCreator(id)}
                      title={creatorName}
                      id={id}
                    />
                  </div>
                )
              })
            }
          </div>
        </ModalSidebar>
        <WithValidationHocRenderPropAdapter
          onInput={this.inputDataOfProgram}
          onSubmit={this.saveDataOfStage}
          value={data}
          rules={rules}
        >
          {(formProps) => {
            const {formValid, onSubmit, onInput} = formProps
            return (
              <div className="h-full flex flex-col justify-between">
                <div
                  className="mx-8"
                >
                    <Avatar
                        className="mt-6 ml-6 mb-6"
                    />
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
                </div>
                <div
                  className="flex justify-end pb-20 pr-8"
                >
                  <div
                    onClick={() => goBack()}
                    name="cancel"
                    type="submit"
                    className="white btn width-m mr-4"
                  >
                    Отмена
                  </div>
                  <button
                    onClick={() => this.saveNewLevel()}
                    name="save"
                    type="submit"
                    className="blue btn width-medium"
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            )
          }}
        </WithValidationHocRenderPropAdapter>
      </ProgramsHeader>
    );
  }
}

LevelsGeneral.propTypes = {
  history: PropTypes.object,
};

export default LevelsGeneral;
