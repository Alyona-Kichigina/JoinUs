import React from 'react';

const Popup = () => (
    <div>
        <h2>Всплывающее окно</h2>
        <img src="/Screenshots/popup.png" alt=""/>
        <div>Оценка: 5 ч.</div>
    </div>
)

export default {
    title: "popup",
    component: Popup
}

const Template = (args) => <Popup {...args} />;

export const Default = Template.bind({});
Default.args = {
};