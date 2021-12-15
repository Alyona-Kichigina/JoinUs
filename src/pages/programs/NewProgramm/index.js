import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from "@Components/Fields/Input"
import PageHeader from "../../../components/PageHeader";
import { FormContainer } from "./style";
import InputForm from "../inputForm";
import {CONTENT_LINKS} from "./Constants";

const pageData = {
    pageName: "Новая программа"
}

const settings = {
    1: [
        {
            id: 1,
            name: "Наименование",
            key: "name",
            Component: Input,
            props: {
                placeholder: "123123"
            }
        },
        {
            id: 2,
            name: "Описание",
            key: "description",
            Component: Input
        }
    ],
    2: [
        {
            id: 3,
            name: "Срок программы",
            key: "time",
            Component: Input
        },
        {
            id: 4,
            name: "Заказчик",
            key: "client",
            Component: Input
        },
        {
            id: 5,
            name: "дата создания",
            key: "date",
            Component: Input
        },
        {
            id: 6,
            name: "создатель",
            key: "creator",
            Component: Input
        },
    ]
}

class NewProgramm extends Component {
    render() {
        return (
            <div>
                <PageHeader
                    {...this.props}
                  url="programs"
                  links={CONTENT_LINKS}
                    pageData={pageData}
                >
                    <InputForm
                        settings={settings}
                    />
                    {/*<div className="flex">*/}
                    {/*    <FormContainer>*/}
                    {/*        <div>*/}
                    {/*            <div>*/}
                    {/*                Наименование*/}
                    {/*            </div>*/}
                    {/*            <Input*/}
                    {/*                id="name"*/}
                    {/*                placeholder="Программа для разработчиков"*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </FormContainer>*/}
                    {/*    <FormContainer>*/}
                    {/*        <button*/}
                    {/*            className="blue btn width-m"*/}
                    {/*        >*/}
                    {/*            + Добавить контакт*/}
                    {/*        </button>*/}
                    {/*    </FormContainer>*/}
                    {/*</div>*/}
                </PageHeader>
            </div>
        );
    }
}

NewProgramm.propTypes = {};

export default NewProgramm;
