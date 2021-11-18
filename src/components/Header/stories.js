import React from 'react';

const Header = () => (
    <div>
        <img src="/Screenshots/header.png" alt=""/>
        <div>Сейчас статично, верстка 1 час</div>
    </div>
)

export default {
    title: "header",
    component: Header
}

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
};
