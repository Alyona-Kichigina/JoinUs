import React, { Component } from 'react';
import axios from "axios";
import AppList from "../../../../components/AppList";
import {DEFAULT_URL, ADAPTATION_PROGRAM, ADAPTATION_LEVELS} from "../../../../components/APIList"
import { NavLink } from "react-router-dom";
import { settings } from "./tableConfig";
import {ModalTableBody, ModalTableHeader} from "../Documents/style";
import {DocumentIcon} from "../../../Constants";
import ChekBox from "@Components/Fields/CheckBox"
import Modal from "../../../../components/ModalWindow";
import { programsBreadcrumbs } from "../../configs";
import ProgramsHeader from "../../ProgramsHeader"
import {NAV_BUTTON_LINKS, NEW_PROGRAM} from "../../Constants";
import ScrollBar from "@Components/ScrollBar"

class Levels extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            editModal: false,
            selectedLevels: [],
            modalData: {},
            isLoaded: false,
            programData: {},
            levels: [],
            items: []
        }
    }

    componentDidMount() {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const newProgram = pathnames[1] === "new_program"
        const url = newProgram ? `${ADAPTATION_LEVELS}` : `${ADAPTATION_PROGRAM}/${pathnames[2]}`
        axios.get(`${DEFAULT_URL}/${url}`)
            .then(
                (response) => {
                    this.setState({
                                    isLoaded: true,
                                    items: newProgram ? [] : response.data.levels_detail,
                                    programData: newProgram ? {} : response.data
                    })
                },
                (error) => {
                    this.setState({
                                    isLoaded: true,
                                    error
                    })
                }
            )
        axios.get(`${DEFAULT_URL}/${ADAPTATION_LEVELS}`)
            .then(
                (response) => {
                    const { data } = response
                    this.setState({
                        levels: data
                    })
                }
            )
    }
    toggleModal = () => {
        const { editModal } = this.state
        this.setState({
            editModal: !editModal
        })
    }
    editStage = (data, nestedLevel) => {
        const { id } = data
        const { history: { push } } = this.props
        push(`${id}/${nestedLevel ? "stage" : "level"}/general`)
    }
    checkLevels = (value, id) => {
        this.setState({
            [id]: value
        })
    }
    saveNewLevel = () => {
        const { selectedLevels, programData: { levels, program_name, create_date, id, status, tier, employee, duration_day, description } } = this.state
        const {
            location: { pathname }
        } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const idLevel = pathnames[1] !== "new_program" ? `/${pathnames[2]}/` : ""
        const newData = {
            levels: levels.concat(selectedLevels.filter(item => !levels.some(a => a === item))),
            create_date,
            program_name,
            id,
            status,
            tier,
            employee,
            duration_day,
            description
        }
        this.setState({
                    editModal: false,
                    selectedLevels: []
                })
        if (selectedLevels.length) {
            axios.put(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idLevel}`, newData)
                .then(
                    (response) => {
                        const { data, data: { levels_detail } } = response
                        this.setState({
                            programData: data,
                            items: levels_detail
                        })
                    }
                )
            this.setState({
                editModal: false,
            })
        }
    }
    deleteItem = ({ id: deleteItemID }, nestedLevel) => {
        if (!nestedLevel) {
            const { programData: { levels, program_name, create_date, id, status, tier, employee, duration_day, description } } = this.state
            const {
                location: { pathname }
            } = this.props
            const pathnames = pathname.split("/").filter(x => x)
            const idLevel = pathnames[1] !== "new_program" ? `/${pathnames[2]}/` : ""
            const newData = {
                levels: levels.filter(item => item !== deleteItemID),
                program_name,
                create_date,
                id,
                status,
                tier,
                employee,
                duration_day,
                description
            }
            axios.put(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idLevel}`, newData)
                .then((response) => {
                    const { data, data: { levels_detail } } = response
                    this.setState({
                        programData: data,
                        items: levels_detail
                    })
                })
        }
    }

    pageHeaderTitle = (program_name) => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const newProgram = pathnames[1] === NEW_PROGRAM
        return newProgram ? "Новая программа" : program_name
    }
render() {
    const { items, editModal, selectedLevels, levels, programData: { program_name } } = this.state
        const { editStage, checkLevels, saveNewLevel, deleteItem, pageHeaderTitle } = this
        return (
          <div className="flex-container">
              <ProgramsHeader
                  {...this.props}
                  bredCrumbsConfig={programsBreadcrumbs}
                  pageData={pageHeaderTitle(program_name)}
                  url="programs"
                  links={NAV_BUTTON_LINKS}
              >
                  <Modal
                      isOpen={editModal}
                      title="Выбор уровня"
                      closeModal={this.toggleModal}
                      handleSave={saveNewLevel}
                  >
                      <ModalTableHeader>
                          <div>№</div>
                          <div>
                              Наименование уровня
                          </div>
                          <div>
                              Комментарии
                          </div>
                      </ModalTableHeader>
                      <ScrollBar>
                          {
                              levels.map(({level_name, description, id}, index) =>  (
                                  <ModalTableBody
                                      key={`${id}${index}`}
                                  >

                                      <div className="flex items-center">
                                          {index + 1}
                                      </div>
                                      <div className="flex items-center">
                                          <div
                                              className="pr-2"
                                              dangerouslySetInnerHTML={{__html: DocumentIcon}}
                                          />
                                          {level_name}
                                      </div>
                                      <div className="flex items-center justify-between">
                                          <div>
                                              {description}
                                          </div>
                                          <ChekBox
                                              className="p-r-14"
                                              id="selectedLevels"
                                              value={selectedLevels}
                                              checkBoxValue={id}
                                              onInput={checkLevels}
                                          />
                                      </div>

                                  </ModalTableBody>
                                  )
                              )
                          }
                      </ScrollBar>
                  </Modal>
                  <div className="pt-6 mb-4 ml-4 flex">
                      <NavLink
                        className="blue btn width-m pt-1.5"
                        to="level/general"
                      >
                          + Добавить уровень
                      </NavLink>
                      <button
                        className="white btn width-m pt-1.5 ml-4"
                        onClick={this.toggleModal}
                      >
                          Выбрать уровень
                      </button>
                  </div>
                  <AppList
                    settings={settings(editStage, deleteItem)}
                    nestedData={true}
                    data={items}
                    nestedKey="stages"
                  />
              </ProgramsHeader>
          </div>
        );
    }
}

Levels.propTypes = {};

export default Levels;
