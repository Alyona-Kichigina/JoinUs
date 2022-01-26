import React, {Component} from 'react';
import memoizeOne from "memoize-one";
import Form from "@Components/Forms/index"
import PropTypes from "prop-types"
import { WithValidationHocRenderPropAdapter } from "../../../../Validator";
import { fieldMap, rules} from "./formConfig";
import { FormContainer } from "../../item/General/style"
import axios from "axios";
import { ADAPTATION_STAGE, DEFAULT_URL } from "../../../../components/APIList";

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

class StagesGeneral extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount() {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const idStage = pathnames[1] !== "new_program" ? `/${pathnames[3]}` : ""
        if (pathnames[1] !== "new_program") {
            axios.get(`${DEFAULT_URL}/${ADAPTATION_STAGE}${idStage}`)
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

    handleInputChange (value, id) {
        this.setState({
            [id]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    saveStage () {
        const { location: { pathname } } = this.props
        const { data } = this.state
        const pathnames = pathname.split("/").filter(x => x)
        const newProgram = pathnames[1] === "new_program"
        const idProgram = newProgram ? "/" : `/${pathnames[3]}/`
        axios[newProgram ? "post" : "put"](`${DEFAULT_URL}/${ADAPTATION_STAGE}${idProgram}`, data)
            .then(
                (response) => {
                    const { data } = response
                    this.setState({
                        isLoaded: true,
                        data: data
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

    inputDataOfStage = (value) => {
        this.setState(({ data }) => ({ data: { ...data, ...value } }))
    }
    saveDataOfStage = (v) => {
        console.log(v)
    }

    tierUp = () => {
        const { data: { tier }, data } = this.state
        this.setState({
            data: { ...data, tier: tier + 1}
        })
    }
    tierDown = () => {
        const { data: { tier }, data } = this.state
        this.setState({
            data: { ...data, tier: tier > 1 ? tier - 1 : tier}
        })
    }

    render() {
        const { history: { goBack } } = this.props
        const { data } = this.state
        const { tierUp, tierDown } = this
        const [firstForm, SecondForm] = withSetDisabledFieldsConfigAndSplitByColumns(fieldMap(tierUp, tierDown))
        return (
                <WithValidationHocRenderPropAdapter
                    onInput={this.inputDataOfStage}
                    onSubmit={this.saveDataOfStage}
                    value={data}
                    rules={rules}
                >
                    {(formProps) => {
                        const { onInput } = formProps
                        return (
                            <div className="h-full flex flex-col justify-between">
                                <div
                                    className="mx-8"
                                >
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
                                        onClick={() => this.saveStage()}
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            </div>
                        )}}
                </WithValidationHocRenderPropAdapter>
        );
    }
}

StagesGeneral.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
};

export default StagesGeneral;
